const express = require('express');
const router = express.Router();
const { getMessages, getUsersForSidebar, sendMessage, markAsRead } = require("../controllers/messageController");
const verifyToken = require("../middleware/verifyToken");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Message = require('../models/message.model');

// Créer le dossier uploads s'il n'existe pas
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Créer l'instance multer directement dans ce fichier
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
});

router.get("/users", verifyToken, getUsersForSidebar);
router.get("/:id", verifyToken, getMessages);
router.post('/send/:id', verifyToken, upload.single('file'), sendMessage);
router.put('/read/:id', verifyToken, markAsRead);

// Routes pour les réactions et la suppression de messages

// Ajouter une réaction
router.post('/messages/reaction', verifyToken, async (req, res) => {
  try {
    const { messageId, reaction } = req.body;
    
    // Vérifier que l'utilisateur a accès à ce message
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: 'Message non trouvé' });
    }
    
    // Vérifier si le message a un champ conversationId
    if (!message.conversationId) {
      // Si le message n'a pas de conversationId, on vérifie simplement
      // si l'utilisateur est l'expéditeur ou le destinataire
      if (message.senderId.toString() !== req.user._id.toString() && 
          message.receiverId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'Non autorisé' });
      }
    } else {
      // Si le message a un conversationId, vérifier que l'utilisateur est dans la conversation
      const Conversation = require('../models/conversation.model');
      const conversation = await Conversation.findById(message.conversationId);
      if (!conversation || !conversation.participants.includes(req.user._id)) {
        return res.status(403).json({ error: 'Non autorisé' });
      }
    }
    
    // Ajouter ou mettre à jour la réaction
    if (!message.reactions) {
      message.reactions = [];
    }
    
    // Vérifier si l'utilisateur a déjà réagi avec cet emoji
    const existingReactionIndex = message.reactions.findIndex(
      r => r.emoji === reaction && r.users.includes(req.user._id)
    );
    
    if (existingReactionIndex >= 0) {
      // Supprimer l'utilisateur de cette réaction
      message.reactions[existingReactionIndex].users = 
        message.reactions[existingReactionIndex].users.filter(id => id.toString() !== req.user._id.toString());
      
      // Mettre à jour le compteur
      message.reactions[existingReactionIndex].count = message.reactions[existingReactionIndex].users.length;
      
      // Supprimer la réaction si plus personne ne l'utilise
      if (message.reactions[existingReactionIndex].count === 0) {
        message.reactions = message.reactions.filter((_, i) => i !== existingReactionIndex);
      }
    } else {
      // Ajouter une nouvelle réaction ou ajouter l'utilisateur à une réaction existante
      const reactionIndex = message.reactions.findIndex(r => r.emoji === reaction);
      
      if (reactionIndex >= 0) {
        message.reactions[reactionIndex].users.push(req.user._id);
        message.reactions[reactionIndex].count = message.reactions[reactionIndex].users.length;
      } else {
        message.reactions.push({
          emoji: reaction,
          count: 1,
          users: [req.user._id]
        });
      }
    }
    
    await message.save();
    
    // Émettre un événement pour les autres utilisateurs via socket.io
    const { io } = require('../lib/socket');
    if (io) {
      // Si le message a un conversationId, émettre l'événement à la conversation
      if (message.conversationId) {
        io.to(message.conversationId.toString()).emit('messageReaction', {
          messageId: message._id,
          reactions: message.reactions
        });
      } else {
        // Sinon, émettre l'événement au destinataire si ce n'est pas l'expéditeur qui réagit
        const { getReceiverSocketId } = require('../lib/socket');
        const receiverId = message.senderId.toString() === req.user._id.toString() 
          ? message.receiverId.toString() 
          : message.senderId.toString();
        
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('messageReaction', {
            messageId: message._id,
            reactions: message.reactions
          });
        }
      }
    }
    
    res.status(200).json({ success: true, reactions: message.reactions });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la réaction:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Supprimer un message
router.delete('/messages/:messageId', verifyToken, async (req, res) => {
  try {
    const { messageId } = req.params;
    
    // Vérifier que le message existe
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: 'Message non trouvé' });
    }
    
    // Vérifier que l'utilisateur est l'auteur du message
    if (message.senderId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Non autorisé à supprimer ce message' });
    }
    
    // Supprimer le message
    await Message.findByIdAndDelete(messageId);
    
    // Émettre un événement pour les autres utilisateurs via socket.io
    const { io } = require('../lib/socket');
    if (io) {
      // Si le message a un conversationId, émettre l'événement à la conversation
      if (message.conversationId) {
        io.to(message.conversationId.toString()).emit('messageDeleted', {
          messageId: message._id
        });
      } else {
        // Sinon, émettre l'événement au destinataire
        const { getReceiverSocketId } = require('../lib/socket');
        const receiverSocketId = getReceiverSocketId(message.receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('messageDeleted', {
            messageId: message._id
          });
        }
      }
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la suppression du message:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router; 