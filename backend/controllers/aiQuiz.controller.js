const quizGenerator = require('../services/aiGenerator.service');
const Quiz = require('../models/quiz.model');

// Middleware de timeout personnalisé
const timeout = (ms) => {
  return (req, res, next) => {
    const timeout = setTimeout(() => {
      res.status(504).json({
        error: "Timeout du serveur",
        details: "La requête a pris trop de temps"
      });
    }, ms);

    res.on('finish', () => clearTimeout(timeout));
    next();
  };
};

exports.generateQuiz = [
  timeout(12000),
  async (req, res) => {
    try {
      if (!req.body.topic || typeof req.body.topic !== 'string') {
        return res.status(400).json({
          error: "Sujet invalide",
          details: "Le sujet doit être une chaîne de caractères valide"
        });
      }

      // Ajoutez un log pour vérifier l'entrée
      console.log('Tentative de génération pour le sujet:', req.body.topic);

      const generatedQuiz = await quizGenerator.generateQuiz({
        topic: req.body.topic,
        questionCount: Math.min(parseInt(req.body.questionCount) || 5, 10)
      });

      // Vérifiez que le quiz a été généré correctement
      if (!generatedQuiz || !generatedQuiz.questions || generatedQuiz.questions.length === 0) {
        throw new Error('La génération a échoué - aucune question valide produite');
      }

      const newQuiz = new Quiz({
        ...generatedQuiz,
        creatorEmail: req.user?.email || req.body.creatorEmail || 'anonymous@example.com',
        difficulty: req.body.difficulty || 'medium',
        attempts: []
      });

      await newQuiz.save();

      return res.status(201).json({
        success: true,
        quiz: newQuiz
      });

    } catch (error) {
      console.error('Erreur contrôleur:', error);
      
      // Message d'erreur plus clair
      let errorMessage = error.message;
      if (error.message.includes('non trouvé') || error.message.includes('Wikipedia')) {
        errorMessage = "Le sujet n'a pas été trouvé sur Wikipedia. Essayez avec un terme plus spécifique.";
      }

      const status = error.message.includes('non trouvé') ? 404 : 500;
      
      return res.status(status).json({
        error: "Échec de la génération",
        details: errorMessage,
        suggestion: "Essayez avec un sujet plus spécifique ou différent"
      });
    }
  }
];