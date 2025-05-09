const express = require('express');
const cors = require('cors');
const advancedChatbot = require('./advancedChatbot');

const router = express.Router();

// Middleware pour parser le JSON
router.use(express.json());
router.use(cors());

// Endpoint pour traiter les messages
router.post('/message', async (req, res) => {
  const { message, userId = 'anonymous' } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Le message est requis' });
  }

  try {
    const response = await advancedChatbot.processMessage(userId, message);
    res.json(response);
  } catch (error) {
    console.error('Erreur API:', error);
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
});

// Endpoint pour récupérer l'historique des conversations
router.get('/history/:userId', async (req, res) => {
  const { userId } = req.params;
  const { limit = 20 } = req.query;

  try {
    const history = await advancedChatbot.getUserHistory(userId, parseInt(limit));
    res.json(history);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique:', error);
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
});

// Endpoint pour vérifier le statut du chatbot
router.get('/status', (req, res) => {
  res.json({ status: 'online', version: '2.0', type: 'advanced' });
});

// Endpoint pour effacer l'historique d'un utilisateur
router.delete('/history/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Supprimer tous les messages de l'utilisateur
    await require('./models/ChatbotMessage').deleteMany({ userId });
    res.json({ success: true, message: 'Historique supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'historique:', error);
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
});

// Endpoint pour obtenir des suggestions de réponses rapides
router.get('/suggestions', (req, res) => {
  const suggestions = [
    { text: "Comment fonctionne SkillExchange?", category: "info" },
    { text: "Je veux apprendre le JavaScript", category: "learn" },
    { text: "Je propose des cours de piano", category: "teach" },
    { text: "Quelles compétences sont disponibles?", category: "info" },
    { text: "Comment créer un compte?", category: "help" }
  ];

  res.json(suggestions);
});

// Endpoint pour obtenir des statistiques sur l'utilisation du chatbot
router.get('/stats', async (req, res) => {
  try {
    const ChatbotMessage = require('./models/ChatbotMessage');
    const { range = 'week' } = req.query;

    // Nombre total de messages
    const totalMessages = await ChatbotMessage.countDocuments();

    // Nombre de messages par rôle
    const userMessages = await ChatbotMessage.countDocuments({ role: 'user' });
    const assistantMessages = await ChatbotMessage.countDocuments({ role: 'assistant' });

    // Messages des dernières 24 heures
    const last24Hours = new Date();
    last24Hours.setHours(last24Hours.getHours() - 24);
    const recentMessages = await ChatbotMessage.countDocuments({ timestamp: { $gte: last24Hours } });

    // Générer des données pour le graphique en fonction de la plage de temps
    let messagesByDay = [];
    let startDate = new Date();
    let days = 7; // Par défaut: semaine

    if (range === 'day') {
      days = 1;
      // Pour un jour, on affiche les messages par heure
      for (let i = 0; i < 24; i++) {
        const hour = new Date();
        hour.setHours(i, 0, 0, 0);
        const nextHour = new Date();
        nextHour.setHours(i + 1, 0, 0, 0);

        const count = await ChatbotMessage.countDocuments({
          timestamp: { $gte: hour, $lt: nextHour }
        });

        messagesByDay.push({
          day: `${i}h`,
          count
        });
      }
    } else {
      if (range === 'month') {
        days = 30;
      } else if (range === 'week') {
        days = 7;
      }

      // Pour semaine ou mois, on affiche les messages par jour
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);

        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);

        const count = await ChatbotMessage.countDocuments({
          timestamp: { $gte: date, $lt: nextDate }
        });

        const dayName = date.toLocaleDateString('fr-FR', { weekday: 'short' });

        messagesByDay.unshift({
          day: dayName,
          count
        });
      }
    }

    // Distribution des intentions (simulée pour l'exemple)
    const intentDistribution = [
      { name: 'Information', value: Math.floor(Math.random() * 40) + 20 },
      { name: 'Aide', value: Math.floor(Math.random() * 30) + 15 },
      { name: 'Apprentissage', value: Math.floor(Math.random() * 25) + 10 },
      { name: 'Autre', value: Math.floor(Math.random() * 20) + 5 }
    ];

    res.json({
      totalMessages,
      userMessages,
      assistantMessages,
      recentMessages,
      averageResponseTime: '1.2s', // Valeur fictive, à implémenter réellement
      messagesByDay,
      intentDistribution
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
});

module.exports = router;
