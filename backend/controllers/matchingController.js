const User = require('../models/user.model');
const Skill = require('../models/skill.model');
const Category = require('../models/category.model');
const mongoose = require('mongoose');
const UserProfile = require('../models/userProfile.model');
const MatchingResult = require('../models/matchingResult.model');
const { spawn } = require('child_process');
const path = require('path');

/**
 * Récupère les utilisateurs suivis par l'utilisateur actuel
 */
const getFollowing = async (req, res) => {
    try {
        const userId = req.user._id;

        // Récupérer l'utilisateur avec ses following
        const user = await User.findById(userId).populate({
            path: 'following',
            select: '-password -resetPasswordToken -resetPasswordExpires -verificationToken -verificationTokenExpires'
        });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json(user.following);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs suivis:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

/**
 * Récupère les followers de l'utilisateur actuel
 */
const getFollowers = async (req, res) => {
    try {
        const userId = req.user._id;

        // Récupérer l'utilisateur avec ses followers
        const user = await User.findById(userId).populate({
            path: 'followers',
            select: '-password -resetPasswordToken -resetPasswordExpires -verificationToken -verificationTokenExpires'
        });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json(user.followers);
    } catch (error) {
        console.error('Erreur lors de la récupération des followers:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

/**
 * Récupère les utilisateurs qui ont participé à des compétences d'une catégorie spécifique
 */
const getUsersByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const userId = req.user._id;

        // Vérifier si la catégorie existe
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Catégorie non trouvée' });
        }

        // Trouver toutes les compétences de cette catégorie
        const skills = await Skill.find({ category: categoryId });

        if (skills.length === 0) {
            return res.status(200).json({ message: 'Aucune compétence trouvée dans cette catégorie', users: [] });
        }

        // Récupérer les IDs des compétences
        const skillIds = skills.map(skill => skill._id);

        // Trouver les utilisateurs qui ont ces compétences
        const users = await User.find({
            _id: { $ne: userId }, // Exclure l'utilisateur actuel
            enrolledSkills: { $in: skillIds }
        }).select('-password -resetPasswordToken -resetPasswordExpires -verificationToken -verificationTokenExpires');

        res.status(200).json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs par catégorie:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

/**
 * Récupère les utilisateurs qui ont participé à des compétences similaires à l'utilisateur actuel
 */
const getSimilarUsers = async (req, res) => {
    try {
        const userId = req.user._id;

        // Récupérer l'utilisateur avec ses compétences
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        if (!user.enrolledSkills || user.enrolledSkills.length === 0) {
            return res.status(200).json({ message: 'Aucune compétence trouvée pour cet utilisateur', users: [] });
        }

        // Trouver les utilisateurs qui ont des compétences similaires
        const similarUsers = await User.aggregate([
            // Exclure l'utilisateur actuel
            { $match: { _id: { $ne: mongoose.Types.ObjectId.createFromHexString(userId) } } },

            // Créer un document pour chaque compétence de l'utilisateur
            { $unwind: "$enrolledSkills" },

            // Filtrer pour ne garder que les compétences qui sont aussi dans les compétences de l'utilisateur actuel
            { $match: { enrolledSkills: { $in: user.enrolledSkills } } },

            // Regrouper par utilisateur et compter le nombre de compétences communes
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    username: { $first: "$username" },
                    email: { $first: "$email" },
                    role: { $first: "$role" },
                    profileImg: { $first: "$profileImg" },
                    bio: { $first: "$bio" },
                    matchingSkillsCount: { $sum: 1 }
                }
            },

            // Trier par nombre de compétences communes (décroissant)
            { $sort: { matchingSkillsCount: -1 } },

            // Limiter à 10 utilisateurs
            { $limit: 10 }
        ]);

        res.status(200).json(similarUsers);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs similaires:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

/**
 * Récupère les matchs de l'utilisateur actuel
 */
const getUserMatches = async (req, res) => {
    try {
        const userId = req.user._id;

        // Récupérer les matchs où l'utilisateur est impliqué
        const matches = await MatchingResult.find({
            $or: [
                { user: userId },
                { matchedUser: userId }
            ],
            status: { $in: ['pending', 'accepted'] }
        }).populate({
            path: 'user matchedUser',
            select: 'name username profileImg bio role'
        }).sort({ 'score.total': -1 });

        res.status(200).json(matches);
    } catch (error) {
        console.error('Erreur lors de la récupération des matchs:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

/**
 * Génère des matchs pour l'utilisateur actuel en utilisant le service Python
 */
const generateMatches = async (req, res) => {
    try {
        const userId = req.user._id;

        // Vérifier si l'utilisateur existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Lancer le script Python pour générer les matchs
        const pythonProcess = spawn('python', [
            path.join(__dirname, '../python/matching_service.py'),
            userId.toString()
        ]);

        let pythonData = '';
        let pythonError = '';

        pythonProcess.stdout.on('data', (data) => {
            pythonData += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            pythonError += data.toString();
        });

        pythonProcess.on('close', async (code) => {
            if (code !== 0) {
                console.error(`Erreur lors de l'exécution du script Python: ${pythonError}`);
                return res.status(500).json({
                    message: 'Erreur lors de la génération des matchs',
                    error: pythonError
                });
            }

            // Récupérer les matchs générés
            const matches = await MatchingResult.find({
                user: userId,
                status: 'pending'
            }).populate({
                path: 'matchedUser',
                select: 'name username profileImg bio role'
            }).sort({ 'score.total': -1 });

            res.status(200).json({
                message: 'Matchs générés avec succès',
                matches: matches
            });
        });
    } catch (error) {
        console.error('Erreur lors de la génération des matchs:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

/**
 * Met à jour le statut d'un match (accepté, rejeté)
 */
const updateMatchStatus = async (req, res) => {
    try {
        const { matchId } = req.params;
        const { status } = req.body;
        const userId = req.user._id;

        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Statut invalide' });
        }

        // Récupérer le match
        const match = await MatchingResult.findById(matchId);

        if (!match) {
            return res.status(404).json({ message: 'Match non trouvé' });
        }

        // Vérifier que l'utilisateur est impliqué dans ce match
        if (!match.user.equals(userId) && !match.matchedUser.equals(userId)) {
            return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à modifier ce match' });
        }

        // Mettre à jour le statut et les interactions
        if (match.user.equals(userId)) {
            match.userInteraction.responded = true;
            match.userInteraction.respondedAt = new Date();
        } else {
            match.matchedUserInteraction.responded = true;
            match.matchedUserInteraction.respondedAt = new Date();
        }

        // Si les deux utilisateurs ont accepté, le match est accepté
        if (status === 'accepted') {
            if (
                (match.user.equals(userId) && match.matchedUserInteraction.responded && match.status === 'pending') ||
                (match.matchedUser.equals(userId) && match.userInteraction.responded && match.status === 'pending')
            ) {
                match.status = 'accepted';
            }
        } else {
            // Si un utilisateur rejette, le match est rejeté
            match.status = 'rejected';
        }

        await match.save();

        res.status(200).json({
            message: 'Statut du match mis à jour avec succès',
            match: match
        });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut du match:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

/**
 * Crée ou met à jour le profil utilisateur pour le matching
 */
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const profileData = req.body;

        // Vérifier si le profil existe déjà
        let userProfile = await UserProfile.findOne({ user: userId });

        if (userProfile) {
            // Mettre à jour le profil existant
            Object.keys(profileData).forEach(key => {
                userProfile[key] = profileData[key];
            });

            await userProfile.save();
        } else {
            // Créer un nouveau profil
            userProfile = new UserProfile({
                user: userId,
                ...profileData
            });

            await userProfile.save();
        }

        res.status(200).json({
            message: 'Profil utilisateur mis à jour avec succès',
            profile: userProfile
        });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du profil utilisateur:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

/**
 * Récupère le profil utilisateur pour le matching
 */
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        // Récupérer le profil utilisateur
        let userProfile = await UserProfile.findOne({ user: userId });

        if (!userProfile) {
            // Créer un profil par défaut si aucun n'existe
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            userProfile = new UserProfile({
                user: userId,
                skills: user.enrolledSkills.map(skillId => ({
                    skill: skillId,
                    proficiencyLevel: 3,
                    interest: 4
                })),
                learningStyle: {
                    visual: 5,
                    auditory: 5,
                    reading: 5,
                    kinesthetic: 5
                },
                availability: {
                    mornings: false,
                    afternoons: true,
                    evenings: true,
                    weekends: true
                },
                preferredLearningPace: 'moderate',
                matchingPreferences: {
                    similarSkills: true,
                    complementarySkills: false,
                    sameExperienceLevel: false,
                    sameAvailability: true
                }
            });

            await userProfile.save();
        }

        res.status(200).json(userProfile);
    } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

module.exports = {
    getFollowing,
    getFollowers,
    getUsersByCategory,
    getSimilarUsers,
    getUserMatches,
    generateMatches,
    updateMatchStatus,
    updateUserProfile,
    getUserProfile
};
