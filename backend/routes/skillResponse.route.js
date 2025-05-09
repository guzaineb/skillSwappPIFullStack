const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken.js');
const { 
    createResponse, 
    getResponsesBySkill, 
    addReply, 
    deleteResponse 
} = require('../controllers/skillResponseController');

// Créer une réponse à un skill
router.post('/create', verifyToken, createResponse);

// Récupérer toutes les réponses pour un skill
router.get('/skill/:skillId', getResponsesBySkill);

// Ajouter une réponse à une réponse existante
router.post('/reply/:responseId', verifyToken, addReply);

// Supprimer une réponse
router.delete('/:responseId', verifyToken, deleteResponse);

module.exports = router;
