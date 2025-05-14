const Message = require('../models/message.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');
const cloudinary = require('../lib/cloudinary');
const fs = require('fs');
const { getReceiverSocketId, io } = require('../lib/socket');
const OpenAI = require('openai'); // ✅ nouvelle importation
const config = require('../config/config');

// ✅ Initialisation d'OpenAI v4
const openai = new OpenAI({
  apiKey: config.openai.apiKey,
});

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }).sort({ createdAt: 1 })
      .populate('senderId', 'fullName profilePic')
      .populate('receiverId', 'fullName profilePic');

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user?._id;
    let fileUrl = null;
    let fileType = null;
    let fileName = null;

    console.log("Requête reçue pour envoyer un message:", {
      body: req.body,
      files: req.files,
      file: req.file,
      params: req.params,
      user: req.user ? { id: req.user._id, name: req.user.fullName } : null
    });

    if (!senderId) {
      console.error("Aucun ID d'expéditeur trouvé dans la requête. Objet utilisateur:", req.user);
      return res.status(400).json({ 
        success: false, 
        message: "L'ID de l'expéditeur est requis" 
      });
    }

    if (!receiverId) {
      return res.status(400).json({ 
        success: false, 
        message: "L'ID du destinataire est requis" 
      });
    }

    // Vérifier si le contenu est vide et s'il n'y a pas de fichier
    if (!content && !req.file) {
      console.log("Message vide et pas de fichier");
      return res.status(400).json({
        success: false,
        message: "Le message ne peut pas être vide"
      });
    }

    console.log("Contenu du message:", content || "(vide)");
    console.log("Fichier attaché:", req.file ? "Oui" : "Non");

    // Traitement du fichier si présent
    if (req.file) {
      console.log("Fichier détecté:", req.file);
      fileUrl = req.file.path;
      fileType = req.file.mimetype;
      fileName = req.file.originalname;
    }

    const messageData = {
      senderId,
      receiverId,
      content: content || "",
      fileUrl,
      fileType,
      fileName,
      delivered: true,
      messageType: req.body.messageType || "sender"
    };

    console.log("Création du message avec les données:", messageData);

    const newMessage = new Message(messageData);
    const savedMessage = await newMessage.save();

    console.log("Message enregistré avec l'ID:", savedMessage._id);

    const populatedMessage = await Message.findById(savedMessage._id)
      .populate('senderId', 'fullName profilePic')
      .populate('receiverId', 'fullName profilePic');

    // Notifier via socket si disponible
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId && io) {
      io.to(receiverSocketId).emit("newMessage", populatedMessage);
    }

    return res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Erreur lors de l'envoi du message", 
      error: error.message 
    });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const message = await Message.findById(id);
    
    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    if (message.receiverId.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    message.read = true;
    await message.save();

    res.status(200).json({ success: true, message: "Message marked as read" });
  } catch (error) {
    console.error("Error in markAsRead: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Fonction compatible avec OpenAI v4
const checkInappropriateContent = async (text) => {
  try {
    console.log('Vérification du contenu via HTTP:', text);

    const response = await openai.moderations.create({
      input: text,
    });

    const results = response.results[0];

    console.log('Résultat de la modération:', {
      flagged: results.flagged,
      categories: results.categories,
    });

    if (results.flagged) {
      console.log('Contenu inapproprié détecté:', results.categories);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Erreur OpenAI, fallback sur détection manuelle:", error);

    const forbiddenWords = ['tuer', 'mort', 'violence', 'haine'];
    const lowerText = text.toLowerCase();

    for (const word of forbiddenWords) {
      if (lowerText.includes(word)) {
        console.log("Mot interdit détecté:", word);
        return true;
      }
    }

    return false;
  }
};

module.exports = {
  getUsersForSidebar,
  getMessages,
  sendMessage,
  markAsRead
};
