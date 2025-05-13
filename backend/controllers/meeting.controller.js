const Meeting = require('../models/meeting.model');
const User = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');

// Créer une nouvelle réunion
exports.createMeeting = async (req, res) => {
  try {
    console.log('📝 Création d\'une réunion par:', req.user.email);
    
    const { title, settings } = req.body;
    
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Le titre de la réunion est requis'
      });
    }
    
    // Générer un ID de réunion unique
    const meetingId = uuidv4().substring(0, 8);
    
    const newMeeting = new Meeting({
      meetingId,
      title,
      hostId: req.user._id,
      settings: settings || {
        allowScreenShare: true,
        allowChat: true,
        waitingRoom: false
      },
      participants: [{ userId: req.user._id, role: 'host' }]
    });
    
    await newMeeting.save();
    
    console.log('✅ Réunion créée avec succès:', meetingId);
    
    return res.status(201).json({
      success: true,
      meeting: {
        meetingId: newMeeting.meetingId,
        title: newMeeting.title,
        hostId: newMeeting.hostId,
        settings: newMeeting.settings,
        createdAt: newMeeting.createdAt
      }
    });
  } catch (error) {
    console.error('❌ Erreur lors de la création de la réunion:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de la réunion',
      error: error.message
    });
  }
};

// Obtenir les détails d'une réunion
exports.getMeetingDetails = async (req, res) => {
  try {
    const { meetingId } = req.params;
    
    const meeting = await Meeting.findOne({ meetingId })
      .populate('hostId', 'name email profilePic')
      .populate('participants.userId', 'name email profilePic');
    
    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: 'Réunion non trouvée'
      });
    }
    
    res.status(200).json({
      success: true,
      meeting
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la réunion:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des détails de la réunion'
    });
  }
};

// Rejoindre une réunion
exports.joinMeeting = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const userId = req.user._id;
    
    const meeting = await Meeting.findOne({ meetingId });
    
    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: 'Réunion non trouvée'
      });
    }
    
    if (!meeting.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Cette réunion est terminée'
      });
    }
    
    // Vérifier si l'utilisateur est déjà dans la liste des participants
    const existingParticipant = meeting.participants.find(
      p => p.userId && p.userId.toString() === userId.toString()
    );
    
    if (!existingParticipant) {
      meeting.participants.push({
        userId,
        joinTime: new Date()
      });
      
      await meeting.save();
    }
    
    res.status(200).json({
      success: true,
      message: 'Vous avez rejoint la réunion'
    });
  } catch (error) {
    console.error('Erreur lors de la participation à la réunion:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la participation à la réunion'
    });
  }
};

// Quitter une réunion
exports.leaveMeeting = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const userId = req.user._id;
    
    await Meeting.updateOne(
      { 
        meetingId, 
        'participants.userId': userId 
      },
      { 
        $set: { 'participants.$.leaveTime': new Date() } 
      }
    );
    
    res.status(200).json({
      success: true,
      message: 'Vous avez quitté la réunion'
    });
  } catch (error) {
    console.error('Erreur lors du départ de la réunion:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors du départ de la réunion'
    });
  }
};

// Terminer une réunion
exports.endMeeting = async (req, res) => {
  try {
    const { meetingId } = req.params;
    
    const meeting = await Meeting.findOne({ meetingId });
    
    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: 'Réunion non trouvée'
      });
    }
    
    // Vérifier si l'utilisateur est l'hôte
    if (meeting.hostId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Seul l\'hôte peut terminer la réunion'
      });
    }
    
    meeting.isActive = false;
    meeting.endTime = new Date();
    await meeting.save();
    
    res.status(200).json({
      success: true,
      message: 'Réunion terminée avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la fin de la réunion:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la fin de la réunion'
    });
  }
};

// Obtenir toutes les réunions d'un utilisateur
exports.getUserMeetings = async (req, res) => {
  try {
    console.log('📝 Récupération des réunions pour:', req.user.email);
    
    // Réunions où l'utilisateur est l'hôte
    const hostedMeetings = await Meeting.find({ hostId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);
    
    // Réunions où l'utilisateur est participant
    const participatedMeetings = await Meeting.find({
      'participants.userId': req.user._id,
      hostId: { $ne: req.user._id }
    })
      .sort({ createdAt: -1 })
      .limit(10);
    
    console.log(`✅ Réunions trouvées: ${hostedMeetings.length} hébergées, ${participatedMeetings.length} participées`);
    
    return res.status(200).json({
      success: true,
      hostedMeetings,
      participatedMeetings
    });
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des réunions:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des réunions',
      error: error.message
    });
  }
};
