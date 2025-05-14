const ScheduledSession = require('../models/scheduledSession.model');
const User = require('../models/user.model');
const { sendEmail } = require('../utils/emailService');

// Créer une nouvelle session planifiée
exports.createSession = async (req, res) => {
  try {
    const { title, description, learningSubject, scheduledDate, duration, participants, skillLevel, isPublic, tags } = req.body;

    // Vérifier si la date est dans le futur
    const sessionDate = new Date(scheduledDate);
    if (sessionDate <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'La date de la session doit être dans le futur'
      });
    }

    // Générer un code de réunion unique
    const meetCode = await ScheduledSession.generateMeetCode();

    // Créer la nouvelle session
    const newSession = new ScheduledSession({
      title,
      description,
      learningSubject,
      scheduledDate: sessionDate,
      duration: duration || 60,
      meetCode,
      creator: req.user._id,
      skillLevel: skillLevel || 'intermédiaire',
      isPublic: isPublic || false,
      tags: tags || []
    });

    // Générer le lien de réunion
    newSession.meetLink = newSession.generateMeetLink();

    // Ajouter les participants si fournis
    if (participants && Array.isArray(participants)) {
      // Traiter chaque participant
      const participantsData = await Promise.all(participants.map(async (email) => {
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });

        return {
          userId: user ? user._id : null,
          email,
          name: user ? user.name : email.split('@')[0],
          status: 'pending',
          notified: false
        };
      }));

      newSession.participants = participantsData;
    }

    // Sauvegarder la session
    await newSession.save();

    // Envoyer des notifications aux participants
    await sendSessionNotifications(newSession);

    res.status(201).json({
      success: true,
      message: 'Session planifiée créée avec succès',
      session: newSession
    });
  } catch (error) {
    console.error('Erreur lors de la création de la session:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de la session',
      error: error.message
    });
  }
};

// Récupérer toutes les sessions planifiées (avec filtres)
exports.getSessions = async (req, res) => {
  try {
    const { status, subject, upcoming, past, creator, participant } = req.query;
    const query = {};

    // Filtrer par statut
    if (status) {
      query.status = status;
    }

    // Filtrer par sujet d'apprentissage
    if (subject) {
      query.learningSubject = { $regex: subject, $options: 'i' };
    }

    // Filtrer par date (à venir ou passées)
    const now = new Date();
    if (upcoming === 'true') {
      query.scheduledDate = { $gt: now };
    } else if (past === 'true') {
      query.scheduledDate = { $lt: now };
    }

    // Filtrer par créateur
    if (creator) {
      query.creator = creator;
    }

    // Filtrer par participant
    if (participant) {
      query['participants.userId'] = participant;
    }

    // Exécuter la requête
    const sessions = await ScheduledSession.find(query)
      .populate('creator', 'name email')
      .populate('participants.userId', 'name email')
      .sort({ scheduledDate: 1 });

    res.status(200).json({
      success: true,
      count: sessions.length,
      sessions
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des sessions:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des sessions',
      error: error.message
    });
  }
};

// Récupérer une session spécifique
exports.getSession = async (req, res) => {
  try {
    const session = await ScheduledSession.findById(req.params.id)
      .populate('creator', 'name email')
      .populate('participants.userId', 'name email');

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session non trouvée'
      });
    }

    res.status(200).json({
      success: true,
      session
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la session:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la session',
      error: error.message
    });
  }
};

// Mettre à jour une session
exports.updateSession = async (req, res) => {
  try {
    const { title, description, learningSubject, scheduledDate, duration, participants, status } = req.body;

    // Trouver la session
    const session = await ScheduledSession.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session non trouvée'
      });
    }

    // Vérifier si l'utilisateur est le créateur
    if (session.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Vous n\'êtes pas autorisé à modifier cette session'
      });
    }

    // Mettre à jour les champs
    if (title) session.title = title;
    if (description) session.description = description;
    if (learningSubject) session.learningSubject = learningSubject;
    if (duration) session.duration = duration;
    if (status) session.status = status;

    // Mettre à jour la date si fournie et dans le futur
    if (scheduledDate) {
      const newDate = new Date(scheduledDate);
      if (newDate <= new Date()) {
        return res.status(400).json({
          success: false,
          message: 'La date de la session doit être dans le futur'
        });
      }
      session.scheduledDate = newDate;
    }

    // Mettre à jour les participants si fournis
    if (participants && Array.isArray(participants)) {
      // Récupérer les nouveaux participants
      const newParticipants = participants.filter(email =>
        !session.participants.some(p => p.email === email)
      );

      // Ajouter les nouveaux participants
      if (newParticipants.length > 0) {
        const participantsData = await Promise.all(newParticipants.map(async (email) => {
          const user = await User.findOne({ email });

          return {
            userId: user ? user._id : null,
            email,
            name: user ? user.name : email.split('@')[0],
            status: 'pending',
            notified: false
          };
        }));

        session.participants = [...session.participants, ...participantsData];

        // Envoyer des notifications aux nouveaux participants
        await sendSessionNotifications(session, newParticipants);
      }
    }

    // Sauvegarder les modifications
    await session.save();

    res.status(200).json({
      success: true,
      message: 'Session mise à jour avec succès',
      session
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la session:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la session',
      error: error.message
    });
  }
};

// Supprimer une session
exports.deleteSession = async (req, res) => {
  try {
    const session = await ScheduledSession.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session non trouvée'
      });
    }

    // Vérifier si l'utilisateur est le créateur
    if (session.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Vous n\'êtes pas autorisé à supprimer cette session'
      });
    }

    await ScheduledSession.deleteOne({ _id: session._id });

    res.status(200).json({
      success: true,
      message: 'Session supprimée avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de la session:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la session',
      error: error.message
    });
  }
};

// Fonction utilitaire pour envoyer des notifications aux participants
async function sendSessionNotifications(session, onlyEmails = null) {
  try {
    const participants = onlyEmails
      ? session.participants.filter(p => onlyEmails.includes(p.email))
      : session.participants;

    for (const participant of participants) {
      if (!participant.notified) {
        // Préparer le contenu de l'email
        const emailContent = {
          to: participant.email,
          subject: `Invitation à une session d'apprentissage: ${session.title}`,
          html: `
            <h2>Vous êtes invité(e) à une session d'apprentissage</h2>
            <p><strong>Sujet:</strong> ${session.learningSubject}</p>
            <p><strong>Date:</strong> ${new Date(session.scheduledDate).toLocaleString()}</p>
            <p><strong>Durée:</strong> ${session.duration} minutes</p>
            <p><strong>Lien de la réunion:</strong> <a href="${session.meetLink}">${session.meetLink}</a></p>
            <p><strong>Code de la réunion:</strong> ${session.meetCode}</p>
            <p>${session.description || ''}</p>
            <p>Pour participer, cliquez sur le lien ci-dessus à l'heure prévue.</p>
          `
        };

        // Envoyer l'email
        await sendEmail(emailContent);

        // Marquer comme notifié
        participant.notified = true;
      }
    }

    // Mettre à jour le statut des notifications
    session.notificationsSent = true;
    await session.save();

    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi des notifications:', error);
    return false;
  }
}
