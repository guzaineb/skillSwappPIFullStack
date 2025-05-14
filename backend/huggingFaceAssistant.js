const axios = require('axios');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

// Configuration Hugging Face
const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

if (!HUGGINGFACE_API_TOKEN) {
  console.error('ERREUR: Token API Hugging Face non défini dans les variables d\'environnement');
  console.error('Veuillez définir la variable d\'environnement HUGGINGFACE_API_TOKEN');
}

// URL de base pour l'API Hugging Face
const HF_API_URL = 'https://api-inference.huggingface.co/models';

// Modèles à utiliser
const MODELS = {
  summarization: 'moussaKam/barthez', // Modèle pour le résumé en français
  questionAnswering: 'etalab-ia/camembert-base-squadFR-fquad-piaf', // Modèle pour les questions-réponses en français
  textClassification: 'camembert-base' // Modèle pour la classification de texte en français
};

/**
 * Client API pour Hugging Face
 */
const hfClient = axios.create({
  baseURL: HF_API_URL,
  headers: {
    'Authorization': `Bearer ${HUGGINGFACE_API_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

/**
 * Génère un résumé à partir d'un texte
 * @param {string} text - Texte à résumer
 * @returns {Promise<string>} - Résumé généré
 */
async function generateSummary(text) {
  try {
    if (!text || text.trim() === '') {
      return 'Aucun texte à résumer.';
    }

    const response = await hfClient.post(`/${MODELS.summarization}`, {
      inputs: text,
      parameters: {
        max_length: 150,
        min_length: 30,
        do_sample: false
      }
    });

    if (response.data && response.data[0] && response.data[0].summary_text) {
      return response.data[0].summary_text.trim();
    } else {
      console.error('Format de réponse inattendu pour le résumé:', response.data);
      return 'Impossible de générer un résumé.';
    }
  } catch (error) {
    console.error('Erreur lors de la génération du résumé:', error);
    return 'Erreur lors de la génération du résumé.';
  }
}

/**
 * Répond à une question en utilisant un contexte
 * @param {string} question - Question posée
 * @param {string} context - Contexte pour répondre à la question
 * @returns {Promise<string>} - Réponse générée
 */
async function answerQuestion(question, context) {
  try {
    if (!question || question.trim() === '') {
      return 'Veuillez poser une question.';
    }

    if (!context || context.trim() === '') {
      return 'Aucun contexte disponible pour répondre à cette question.';
    }

    const response = await hfClient.post(`/${MODELS.questionAnswering}`, {
      inputs: {
        question: question,
        context: context
      }
    });

    if (response.data && response.data.answer) {
      return response.data.answer;
    } else {
      console.error('Format de réponse inattendu pour la question:', response.data);
      return 'Je ne trouve pas de réponse à cette question dans le contexte de la réunion.';
    }
  } catch (error) {
    console.error('Erreur lors de la réponse à la question:', error);
    return 'Erreur lors de la génération de la réponse.';
  }
}

/**
 * Extrait les points clés, questions et actions à partir des messages
 * @param {Array} messages - Messages de la réunion
 * @returns {Promise<Object>} - Résultats de l'analyse
 */
async function extractInformation(messages) {
  // Fonction d'extraction locale basée sur des règles simples
  function localExtraction(messages) {
    const keyPoints = [];
    const questions = [];
    const actions = [];

    messages.forEach(msg => {
      const text = msg.text.toLowerCase();
      
      // Détecter les points clés (phrases avec des mots-clés importants)
      if (text.includes('important') || text.includes('essentiel') || text.includes('clé') || 
          text.includes('noter') || text.includes('rappeler') || text.includes('principal')) {
        keyPoints.push(msg.text);
      }
      
      // Détecter les questions
      if (text.includes('?') || text.startsWith('qui ') || text.startsWith('quoi ') || 
          text.startsWith('quand ') || text.startsWith('comment ') || text.startsWith('pourquoi ') ||
          text.startsWith('où ') || text.startsWith('est-ce que ')) {
        questions.push(msg.text);
      }
      
      // Détecter les actions
      if (text.includes('faire') || text.includes('action') || text.includes('tâche') || 
          text.includes('devoir') || text.includes('il faut') || text.includes('besoin de') ||
          text.includes('nécessaire de')) {
        actions.push(msg.text);
      }
    });

    return { keyPoints, questions, actions };
  }

  try {
    // Si pas de messages ou token non défini, utiliser l'extraction locale
    if (!messages || messages.length === 0 || !HUGGINGFACE_API_TOKEN) {
      console.log('Utilisation de l\'extraction locale');
      const localResults = localExtraction(messages || []);
      return {
        keyPoints: localResults.keyPoints,
        questions: localResults.questions,
        actions: localResults.actions,
        summary: messages && messages.length > 0 
          ? 'Analyse locale effectuée sans IA avancée.' 
          : 'Aucun message à analyser.'
      };
    }

    // Préparer le texte des messages
    const messagesText = messages.map(msg => `${msg.sender || 'Utilisateur'}: ${msg.text}`).join('\n');
    
    // Générer le résumé
    const summary = await generateSummary(messagesText);
    
    // Pour l'extraction des points clés, questions et actions, on utilise l'extraction locale
    // car ces tâches sont plus complexes et nécessiteraient des modèles spécifiquement fine-tunés
    const { keyPoints, questions, actions } = localExtraction(messages);

    return {
      keyPoints,
      questions,
      actions,
      summary
    };
  } catch (error) {
    console.error('Erreur lors de l\'extraction d\'informations:', error);
    
    // En cas d'erreur, revenir à l'extraction locale
    const localResults = localExtraction(messages || []);
    return {
      keyPoints: localResults.keyPoints,
      questions: localResults.questions,
      actions: localResults.actions,
      summary: 'Erreur lors de l\'analyse avec Hugging Face. Analyse locale utilisée.'
    };
  }
}

/**
 * Analyse les messages de la réunion pour extraire les points clés, questions et actions
 * @param {Array} messages - Liste des messages de la réunion
 * @returns {Promise<Object>} - Résultats de l'analyse
 */
async function analyzeMeetingMessages(messages) {
  try {
    console.log(`Analyse de ${messages?.length || 0} messages avec Hugging Face...`);

    // Vérifier si le token API est défini
    if (!HUGGINGFACE_API_TOKEN) {
      console.error('Erreur: Token API Hugging Face non défini');
      return {
        keyPoints: [],
        questions: [],
        actions: [],
        summary: "Impossible d'analyser les messages: Token API Hugging Face non configuré.",
        error: "Configuration Hugging Face manquante"
      };
    }

    // Valider les messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.log('Aucun message à analyser');
      return {
        keyPoints: [],
        questions: [],
        actions: [],
        summary: "Aucun message à analyser."
      };
    }

    // Filtrer les messages valides (avec du texte)
    const validMessages = messages.filter(msg => msg && msg.text && typeof msg.text === 'string');

    if (validMessages.length === 0) {
      console.log('Aucun message valide à analyser');
      return {
        keyPoints: [],
        questions: [],
        actions: [],
        summary: "Aucun message valide à analyser."
      };
    }

    // Extraire les informations
    const result = await extractInformation(validMessages);
    
    console.log('Analyse réussie:', {
      keyPoints: result.keyPoints?.length || 0,
      questions: result.questions?.length || 0,
      actions: result.actions?.length || 0,
      summary: result.summary ? 'Présent' : 'Absent'
    });

    return result;
  } catch (error) {
    console.error('Erreur lors de l\'analyse des messages:', error);
    return {
      keyPoints: [],
      questions: [],
      actions: [],
      summary: `Erreur lors de l'analyse: ${error.message || 'Erreur inconnue'}`,
      error: error.message || 'Erreur inconnue'
    };
  }
}

/**
 * Génère une réponse à une question spécifique
 * @param {Array} messages - Messages de la réunion (contexte)
 * @param {string} question - Question posée
 * @returns {Promise<string>} - Réponse générée
 */
async function generateAssistantResponse(messages, question) {
  try {
    console.log(`Génération d'une réponse à la question: "${question}"`);

    // Vérifier si le token API est défini
    if (!HUGGINGFACE_API_TOKEN) {
      console.error('Erreur: Token API Hugging Face non défini');
      return "Impossible de générer une réponse: Token API Hugging Face non configuré.";
    }

    // Valider les entrées
    if (!question || typeof question !== 'string' || question.trim() === '') {
      return "Veuillez poser une question valide.";
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return "Aucun contexte de réunion disponible pour répondre à cette question.";
    }

    // Filtrer les messages valides (avec du texte)
    const validMessages = messages.filter(msg => msg && msg.text && typeof msg.text === 'string');

    if (validMessages.length === 0) {
      return "Aucun message valide dans le contexte de la réunion pour répondre à cette question.";
    }

    // Préparer le contexte avec les messages précédents
    const context = validMessages.map(msg => `${msg.sender || 'Utilisateur'}: ${msg.text}`).join('\n');

    // Générer la réponse
    const response = await answerQuestion(question, context);
    
    return response;
  } catch (error) {
    console.error('Erreur lors de la génération de la réponse:', error);
    return `Erreur lors de la génération de la réponse: ${error.message || 'Erreur inconnue'}`;
  }
}

module.exports = {
  analyzeMeetingMessages,
  generateAssistantResponse
};
