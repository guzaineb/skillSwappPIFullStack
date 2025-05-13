const SkillResponse = require('../models/skillResponse.model');
const Skill = require('../models/skill.model');
const User = require('../models/user.model');
const Notification = require('../models/notification.model');
const mongoose = require('mongoose');

// Créer une réponse à un skill
const createResponse = async (req, res) => {
    try {
        const { skillId, text } = req.body;
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ error: "Utilisateur non authentifié" });
        }

        if (!text) {
            return res.status(400).json({ error: "Le texte est requis" });
        }

        // Vérifier si le skill existe
        const skill = await Skill.findById(skillId);
        if (!skill) {
            return res.status(404).json({ error: "Skill non trouvé" });
        }

        // Créer la réponse
        const newResponse = new SkillResponse({
            skill: skillId,
            user: userId,
            text
        });

        await newResponse.save();

        // Récupérer la réponse avec les informations de l'utilisateur
        const populatedResponse = await SkillResponse.findById(newResponse._id)
            .populate({
                path: "user",
                select: "name email profileImg"
            });

        // Créer une notification pour le créateur du skill (si implémenté)
        // Cette partie peut être ajoutée plus tard si le modèle de skill inclut un champ creator

        res.status(201).json(populatedResponse);
    } catch (error) {
        console.error("Erreur lors de la création de la réponse:", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

// Récupérer toutes les réponses pour un skill
const getResponsesBySkill = async (req, res) => {
    try {
        const { skillId } = req.params;

        // Vérifier si le skill existe
        const skill = await Skill.findById(skillId);
        if (!skill) {
            return res.status(404).json({ error: "Skill non trouvé" });
        }

        // Récupérer toutes les réponses pour ce skill
        const responses = await SkillResponse.find({ skill: skillId })
            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "name email profileImg"
            })
            .populate({
                path: "replies.user",
                select: "name email profileImg"
            });

        res.status(200).json(responses);
    } catch (error) {
        console.error("Erreur lors de la récupération des réponses:", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

// Ajouter une réponse à une réponse existante (réponse imbriquée)
const addReply = async (req, res) => {
    try {
        const { responseId } = req.params;
        const { text } = req.body;
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ error: "Utilisateur non authentifié" });
        }

        if (!text) {
            return res.status(400).json({ error: "Le texte est requis" });
        }

        // Vérifier si la réponse existe
        const response = await SkillResponse.findById(responseId);
        if (!response) {
            return res.status(404).json({ error: "Réponse non trouvée" });
        }

        // Ajouter la réponse imbriquée
        const reply = {
            user: userId,
            text,
            createdAt: new Date()
        };

        response.replies.push(reply);
        await response.save();

        // Récupérer la réponse mise à jour avec les informations des utilisateurs
        const updatedResponse = await SkillResponse.findById(responseId)
            .populate({
                path: "user",
                select: "name email profileImg"
            })
            .populate({
                path: "replies.user",
                select: "name email profileImg"
            });

        // Créer une notification pour l'auteur de la réponse originale
        if (response.user.toString() !== userId) {
            try {
                const notification = new Notification({
                    from: userId,
                    to: response.user,
                    type: "comment",
                    // Nous pourrions ajouter un nouveau type "skill_reply" si nécessaire
                });
                await notification.save();
            } catch (notifError) {
                console.log("Erreur lors de la création de la notification:", notifError);
                // Continuer même si la notification échoue
            }
        }

        res.status(200).json(updatedResponse);
    } catch (error) {
        console.error("Erreur lors de l'ajout de la réponse imbriquée:", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

// Supprimer une réponse
const deleteResponse = async (req, res) => {
    try {
        const { responseId } = req.params;
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ error: "Utilisateur non authentifié" });
        }

        // Vérifier si la réponse existe
        const response = await SkillResponse.findById(responseId);
        if (!response) {
            return res.status(404).json({ error: "Réponse non trouvée" });
        }

        // Vérifier si l'utilisateur est l'auteur de la réponse
        if (response.user.toString() !== userId) {
            return res.status(403).json({ error: "Non autorisé à supprimer cette réponse" });
        }

        await SkillResponse.findByIdAndDelete(responseId);

        res.status(200).json({ message: "Réponse supprimée avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression de la réponse:", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

module.exports = {
    createResponse,
    getResponsesBySkill,
    addReply,
    deleteResponse
};
