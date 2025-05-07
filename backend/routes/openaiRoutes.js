const express = require('express');
const router = express.Router();
const { NlpManager } = require('node-nlp');
const ChatbotMessage = require('../models/ChatbotMessage');

// Initialisation du NLP Manager
const manager = new NlpManager({ languages: ['fr'], forceNER: true });

manager.addDocument('fr', 'bonjour', 'salutation.hello');
manager.addDocument('fr', 'salut', 'salutation.hello');
manager.addDocument('fr', 'merci', 'salutation.thanks');
manager.addDocument('fr', 'au revoir', 'salutation.bye');
manager.addDocument('fr', 'comment ça va', 'salutation.status');

manager.addAnswer('fr', 'salutation.hello', 'Bonjour ! Comment puis-je vous aider ?');
manager.addAnswer('fr', 'salutation.thanks', 'Avec plaisir !');
manager.addAnswer('fr', 'salutation.bye', 'À bientôt !');
manager.addAnswer('fr', 'salutation.status', 'Je vais bien, merci !');

manager.addDocument('fr', 'je veux apprendre le javascript', 'skill.learn');
manager.addDocument('fr', 'je propose des cours de piano', 'skill.offer');
manager.addDocument('fr', 'comment fonctionne skillExchange', 'info.how');
manager.addDocument('fr', 'quelles compétences sont disponibles', 'skill.available');
manager.addDocument('fr', 'voir mon niveau de progression', 'user.progress');

manager.addAnswer('fr', 'skill.learn', 'Super ! Nous allons chercher un mentor en JavaScript pour vous.');
manager.addAnswer('fr', 'skill.offer', 'Merci pour votre contribution ! Votre offre va être publiée.');
manager.addAnswer('fr', 'info.how', 'SkillExchange permet aux utilisateurs d’échanger des compétences gratuitement.');
manager.addAnswer('fr', 'skill.available', 'Voici une liste des compétences populaires : JavaScript, Piano, Anglais...');
manager.addAnswer('fr', 'user.progress', 'Vous avez complété 40% de votre parcours d’apprentissage.');


let isTrained = false;

router.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    // Sauvegarder le message de l'utilisateur
    const userMsg = new ChatbotMessage({ role: 'user', content: message });
    await userMsg.save();

    // Entraîner le NLP si ce n'est pas encore fait
    if (!isTrained) {
      await manager.train();
      manager.save();
      isTrained = true;
    }

    // Traitement NLP
    const response = await manager.process('fr', message);
    const botReply = response.answer || "Désolé, je n'ai pas compris votre demande.";

    // Sauvegarder la réponse du bot
    const botMsg = new ChatbotMessage({ role: 'assistant', content: botReply });
    await botMsg.save();

    res.json({ reply: botReply });

  } catch (error) {
    console.error('Erreur NLP:', error);
    res.status(500).json({ error: "Erreur interne du chatbot." });
  }
});

module.exports = router;
