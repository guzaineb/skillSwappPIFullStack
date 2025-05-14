const express = require('express');
const router = express.Router();
const { NlpManager } = require('node-nlp');
const ChatbotMessage = require('../models/ChatbotMessage');

// Initialisation du NLP Manager
const manager = new NlpManager({ languages: ['fr', 'tn'], forceNER: true });

// Expressions tunisiennes
manager.addDocument('tn', 'aslema', 'salutation.hello');
manager.addDocument('tn', 'salem', 'salutation.hello');
manager.addDocument('tn', 'barsha merci', 'salutation.thanks');
manager.addDocument('tn', 'beslema', 'salutation.bye');
manager.addDocument('tn', 'chne7welk', 'salutation.status');
manager.addDocument('tn', 'nheb net3allem javascript', 'skill.learn');
manager.addDocument('tn', 'najem na3ti cours piano', 'skill.offer');
manager.addDocument('tn', 'kifach temchi skillExchange', 'info.how');
manager.addDocument('tn', 'chnowa l competences el mawjouda', 'skill.available');
manager.addDocument('tn', 'nheb nchouf 9déch wa9eft fil parcours', 'user.progress');

// Réponses en darija tunisienne
manager.addAnswer('tn', 'salutation.hello', 'Aslema ! Kif nجم n3awnek ?');
manager.addAnswer('tn', 'salutation.thanks', '3alaziz ! Marhbé bik déma.');
manager.addAnswer('tn', 'salutation.bye', 'Beslema, nchoufek mara okhra !');
manager.addAnswer('tn', 'salutation.status', 'L7amdellah, enti labes ?');
manager.addAnswer('tn', 'skill.learn', '5ir 3lik ! Béch na9raw mentor fi JavaScript.');
manager.addAnswer('tn', 'skill.offer', 'Bravo ! L offre mte3ek béch tsir disponible.');
manager.addAnswer('tn', 'info.how', 'SkillExchange t5alik tbaddel compétences b la flous.');
manager.addAnswer('tn', 'skill.available', 'Tawa 3andna JavaScript, Piano, Anglais w barcha okhra.');
manager.addAnswer('tn', 'user.progress', 'Inti 9addimt 40% mel parcours mte3ek.');

// Expressions françaises
manager.addDocument('fr', 'bonjour', 'salutation.hello');
manager.addDocument('fr', 'salut', 'salutation.hello');
manager.addDocument('fr', 'merci', 'salutation.thanks');
manager.addDocument('fr', 'au revoir', 'salutation.bye');
manager.addDocument('fr', 'comment ça va', 'salutation.status');
manager.addDocument('fr', 'je veux apprendre le javascript', 'skill.learn');
manager.addDocument('fr', 'je propose des cours de piano', 'skill.offer');
manager.addDocument('fr', 'comment fonctionne skillExchange', 'info.how');
manager.addDocument('fr', 'quelles compétences sont disponibles', 'skill.available');
manager.addDocument('fr', 'voir mon niveau de progression', 'user.progress');

// Réponses en français
manager.addAnswer('fr', 'salutation.hello', 'Bonjour ! Comment puis-je vous aider ?');
manager.addAnswer('fr', 'salutation.thanks', 'Avec plaisir !');
manager.addAnswer('fr', 'salutation.bye', 'À bientôt !');
manager.addAnswer('fr', 'salutation.status', 'Je vais bien, merci !');
manager.addAnswer('fr', 'skill.learn', 'Super ! Nous allons chercher un mentor en JavaScript pour vous.');
manager.addAnswer('fr', 'skill.offer', 'Merci pour votre contribution ! Votre offre va être publiée.');
manager.addAnswer('fr', 'info.how', 'SkillExchange permet aux utilisateurs d \ échanger des compétences gratuitement.');
manager.addAnswer('fr', 'skill.available', 'Voici une liste des compétences populaires : JavaScript, Piano, Anglais...');
manager.addAnswer('fr', 'user.progress', 'Vous avez complété 40% de votre parcours d \'apprentissage.');

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

    // Traitement NLP - essayer d'abord en tunisien, puis en français si pas de réponse
    let response = await manager.process('tn', message);
    if (!response.answer) {
      response = await manager.process('fr', message);
    }
    const botReply = response.answer || "Ma fhemtch chnowa t7eb ta9oul. 🙈";

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
