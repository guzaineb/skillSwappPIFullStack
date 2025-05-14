const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
    getFollowing,
    getFollowers,
    getUsersByCategory,
    getSimilarUsers,
    getUserMatches,
    generateMatches,
    updateMatchStatus,
    updateUserProfile,
    getUserProfile
} = require('../controllers/matchingController');

// Route pour obtenir les utilisateurs suivis par l'utilisateur actuel
router.get('/following', verifyToken, getFollowing);

// Route pour obtenir les followers de l'utilisateur actuel
router.get('/followers', verifyToken, getFollowers);

// Route pour obtenir les utilisateurs qui ont participé à des compétences d'une catégorie spécifique
router.get('/category/:categoryId', verifyToken, getUsersByCategory);

// Route pour obtenir les utilisateurs qui ont des compétences similaires à l'utilisateur actuel
router.get('/similar', verifyToken, getSimilarUsers);

// Routes pour le matching basé sur l'IA
router.get('/matches', verifyToken, getUserMatches);
router.post('/generate-matches', verifyToken, generateMatches);
router.put('/match/:matchId', verifyToken, updateMatchStatus);

// Routes pour le profil utilisateur de matching
router.get('/profile', verifyToken, getUserProfile);
router.post('/profile', verifyToken, updateUserProfile);

module.exports = router;
