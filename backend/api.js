const express = require('express');
const cors = require('cors');
const chatbot = require('./chatbot');

const router = express.Router();

// Middleware pour parser le JSON
router.use(express.json());
router.use(cors());

// Endpoint pour traiter les messages
router.post('/message', async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Le message est requis' });
  }
  
  try {
    const response = await chatbot.processMessage(message);
    res.json(response);
  } catch (error) {
    console.error('Erreur API:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Endpoint pour vérifier le statut du chatbot
router.get('/status', (req, res) => {
  res.json({ status: 'online' });
});

module.exports = router;