const express = require('express');
const router = express.Router();
const scheduledSessionController = require('../controllers/scheduledSession.controller');
const protectRoute = require('../middleware/protectRoute');
const ScheduledSession = require('../models/scheduledSession.model');

// Routes pour les sessions planifiées
// Créer une nouvelle session
router.post('/', protectRoute, scheduledSessionController.createSession);

// Récupérer toutes les sessions (avec filtres)
router.get('/', scheduledSessionController.getSessions);

// Récupérer les sessions de l'utilisateur connecté
router.get('/my-sessions', protectRoute, (req, res) => {
  req.query.creator = req.user._id;
  scheduledSessionController.getSessions(req, res);
});

// Récupérer les sessions auxquelles l'utilisateur est invité
router.get('/my-invitations', protectRoute, (req, res) => {
  req.query.participant = req.user._id;
  scheduledSessionController.getSessions(req, res);
});

// Récupérer une session spécifique
router.get('/:id', scheduledSessionController.getSession);

// Mettre à jour une session
router.put('/:id', protectRoute, scheduledSessionController.updateSession);

// Supprimer une session
router.delete('/:id', protectRoute, scheduledSessionController.deleteSession);

// Répondre à une invitation
router.post('/:id/respond', protectRoute, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['accepted', 'declined'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Statut invalide. Utilisez "accepted" ou "declined".'
      });
    }

    const session = await ScheduledSession.findById(id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session non trouvée'
      });
    }

    // Trouver le participant
    const participantIndex = session.participants.findIndex(
      p => p.userId && p.userId.toString() === req.user._id.toString() ||
        p.email === req.user.email
    );

    if (participantIndex === -1) {
      return res.status(403).json({
        success: false,
        message: 'Vous n\'êtes pas invité à cette session'
      });
    }

    // Mettre à jour le statut
    session.participants[participantIndex].status = status;
    await session.save();

    res.status(200).json({
      success: true,
      message: `Invitation ${status === 'accepted' ? 'acceptée' : 'refusée'} avec succès`,
      status
    });
  } catch (error) {
    console.error('Erreur lors de la réponse à l\'invitation:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la réponse à l\'invitation',
      error: error.message
    });
  }
});

// Rejoindre une session avec un code
router.post('/join/:meetCode', protectRoute, async (req, res) => {
  try {
    const { meetCode } = req.params;

    const session = await ScheduledSession.findOne({ meetCode });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session non trouvée avec ce code'
      });
    }

    // Vérifier si l'utilisateur est déjà participant
    const isParticipant = session.participants.some(
      p => p.userId && p.userId.toString() === req.user._id.toString() ||
        p.email === req.user.email
    );

    if (isParticipant) {
      return res.status(400).json({
        success: false,
        message: 'Vous êtes déjà participant à cette session'
      });
    }

    // Ajouter l'utilisateur comme participant
    session.participants.push({
      userId: req.user._id,
      email: req.user.email,
      name: req.user.name,
      status: 'accepted',
      notified: true
    });

    await session.save();

    res.status(200).json({
      success: true,
      message: 'Vous avez rejoint la session avec succès',
      session
    });
  } catch (error) {
    console.error('Erreur lors de la tentative de rejoindre la session:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la tentative de rejoindre la session',
      error: error.message
    });
  }
});

module.exports = router;
