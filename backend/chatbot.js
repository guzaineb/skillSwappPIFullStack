const { NlpManager } = require('node-nlp');
const fs = require('fs');
const path = require('path');

// Charger le modèle NLP
const manager = new NlpManager({ languages: ['fr'] });
const modelPath = path.join(__dirname, '../model.nlp');

// Fonction pour charger le modèle
async function loadModel() {
  if (fs.existsSync(modelPath)) {
    await manager.load(modelPath);
    console.log('Modèle NLP chargé avec succès');
  } else {
    console.error('Modèle NLP non trouvé');
  }
}

// Fonction pour traiter les messages
async function processMessage(message) {
  if (!message) return { error: 'Message requis' };
  
  try {
    const response = await manager.process('fr', message);
    return {
      intent: response.intent,
      score: response.score,
      answer: response.answer || 'Je ne comprends pas votre demande',
      sentiment: response.sentiment
    };
  } catch (error) {
    console.error('Erreur lors du traitement du message:', error);
    return { error: 'Erreur de traitement' };
  }
}

module.exports = {
  loadModel,
  processMessage
};