const express = require('express');
const router = express.Router();
// Importer à la fois les assistants OpenAI et Hugging Face
const openaiAssistant = require('../meetingAssistant');
const huggingFaceAssistant = require('../huggingFaceAssistant');
const Meeting = require('../models/meeting.model');

// Déterminer quel assistant utiliser en fonction de la configuration
const useHuggingFace = process.env.USE_HUGGINGFACE === 'true';
console.log(`Utilisation de ${useHuggingFace ? 'Hugging Face' : 'OpenAI'} pour l'assistant de réunion`);

// Sélectionner les fonctions appropriées
const { analyzeMeetingMessages, generateAssistantResponse } = useHuggingFace
  ? huggingFaceAssistant
  : openaiAssistant;

/**
 * Route pour analyser les messages d'une réunion
 * POST /api/meeting-assistant/analyze
 */
router.post('/analyze', async (req, res) => {
  try {
    const { meetingId, messages } = req.body;

    // Vérifier si l'ID de réunion est fourni
    if (!meetingId) {
      return res.status(400).json({
        error: 'L\'ID de réunion est requis'
      });
    }

    // Si les messages ne sont pas fournis, essayer de les récupérer depuis la base de données
    let messagesToAnalyze = messages;

    if (!messagesToAnalyze || !Array.isArray(messagesToAnalyze) || messagesToAnalyze.length === 0) {
      console.log(`Aucun message fourni, récupération depuis la base de données pour la réunion ${meetingId}`);

      try {
        const meeting = await Meeting.findOne({ meetingId });

        if (!meeting) {
          return res.status(404).json({
            error: 'Réunion non trouvée'
          });
        }

        messagesToAnalyze = meeting.messages || [];

        if (messagesToAnalyze.length === 0) {
          return res.status(400).json({
            error: 'Aucun message trouvé pour cette réunion'
          });
        }

        console.log(`${messagesToAnalyze.length} messages récupérés depuis la base de données`);
      } catch (dbError) {
        console.error('Erreur lors de la récupération des messages depuis la base de données:', dbError);
        return res.status(500).json({
          error: 'Erreur lors de la récupération des messages depuis la base de données',
          details: dbError.message
        });
      }
    }

    console.log(`Requête d'analyse reçue pour ${messagesToAnalyze.length} messages de la réunion ${meetingId}`);

    // Analyser les messages
    const analysis = await analyzeMeetingMessages(messagesToAnalyze);

    // Enregistrer l'analyse dans la base de données
    try {
      await Meeting.findOneAndUpdate(
        { meetingId },
        {
          $set: {
            'aiAnalysis.lastUpdated': new Date(),
            'aiAnalysis.keyPoints': analysis.keyPoints,
            'aiAnalysis.questions': analysis.questions,
            'aiAnalysis.actions': analysis.actions,
            'aiAnalysis.summary': analysis.summary
          }
        },
        { upsert: false }
      );

      console.log(`Analyse enregistrée dans la base de données pour la réunion ${meetingId}`);
    } catch (updateError) {
      console.error('Erreur lors de l\'enregistrement de l\'analyse dans la base de données:', updateError);
      // Continuer malgré l'erreur d'enregistrement
    }

    // Renvoyer les résultats
    res.json(analysis);

  } catch (error) {
    console.error('Erreur lors de l\'analyse des messages:', error);
    res.status(500).json({
      error: 'Erreur serveur lors de l\'analyse des messages',
      details: error.message
    });
  }
});

/**
 * Route pour obtenir l'analyse existante d'une réunion
 * GET /api/meeting-assistant/analysis/:meetingId
 */
router.get('/analysis/:meetingId', async (req, res) => {
  try {
    const { meetingId } = req.params;

    if (!meetingId) {
      return res.status(400).json({ error: 'ID de réunion requis' });
    }

    // Récupérer l'analyse depuis la base de données
    const meeting = await Meeting.findOne({ meetingId });

    if (!meeting) {
      return res.status(404).json({ error: 'Réunion non trouvée' });
    }

    // Vérifier si une analyse existe
    if (!meeting.aiAnalysis || !meeting.aiAnalysis.lastUpdated) {
      return res.status(404).json({ error: 'Aucune analyse disponible pour cette réunion' });
    }

    // Renvoyer l'analyse
    res.json({
      lastUpdated: meeting.aiAnalysis.lastUpdated,
      keyPoints: meeting.aiAnalysis.keyPoints || [],
      questions: meeting.aiAnalysis.questions || [],
      actions: meeting.aiAnalysis.actions || [],
      summary: meeting.aiAnalysis.summary || "Aucun résumé disponible."
    });

  } catch (error) {
    console.error('Erreur lors de la récupération de l\'analyse:', error);
    res.status(500).json({
      error: 'Erreur serveur lors de la récupération de l\'analyse',
      details: error.message
    });
  }
});

/**
 * Route pour générer une réponse à une question
 * POST /api/meeting-assistant/ask
 */
router.post('/ask', async (req, res) => {
  try {
    const { meetingId, question } = req.body;

    if (!meetingId) {
      return res.status(400).json({ error: 'ID de réunion requis' });
    }

    if (!question || typeof question !== 'string' || question.trim() === '') {
      return res.status(400).json({ error: 'Question requise' });
    }

    // Récupérer les messages de la réunion
    const meeting = await Meeting.findOne({ meetingId });

    if (!meeting) {
      return res.status(404).json({ error: 'Réunion non trouvée' });
    }

    const messages = meeting.messages || [];

    if (messages.length === 0) {
      return res.status(400).json({ error: 'Aucun message trouvé pour cette réunion' });
    }

    // Générer une réponse
    const response = await generateAssistantResponse(messages, question);

    // Renvoyer la réponse
    res.json({ response });

  } catch (error) {
    console.error('Erreur lors de la génération de la réponse:', error);
    res.status(500).json({
      error: 'Erreur serveur lors de la génération de la réponse',
      details: error.message
    });
  }
});

module.exports = router;
