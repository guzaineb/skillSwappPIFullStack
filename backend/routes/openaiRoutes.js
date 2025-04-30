const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const ChatbotMessage = require('../models/ChatbotMessage');

// Initialisation de l'objet OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Clé API via variable d'environnement
});

// Endpoint pour le chat avec OpenAI
router.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    // Sauvegarde du message utilisateur
    const userMsg = new ChatbotMessage({ role: 'user', content: message });
    await userMsg.save();

    // Appel à l'API OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'user', content: message },
      ],
    });

    const botReply = response.choices[0].message.content;

    // Sauvegarde du message de l'assistant
    const botMsg = new ChatbotMessage({ role: 'assistant', content: botReply });
    await botMsg.save();

    // Envoi de la réponse au frontend
    res.json({ reply: botReply });

  } catch (err) {
    console.error('Erreur dans /chat:', err);
    res.status(500).json({ error: 'Erreur lors du traitement du message.' });
  }
});

module.exports = router;
