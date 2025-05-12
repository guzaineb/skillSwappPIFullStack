const Message = require('../models/message.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');
const cloudinary = require('../lib/cloudinary');
const fs = require('fs');
const { getReceiverSocketId, io } = require('../lib/socket');
const { Configuration, OpenAIApi } = require('openai');
const config = require('../config/config');

// Configuration OpenAI
const configuration = new Configuration({
  apiKey: config.openai.apiKey,
});
const openai = new OpenAIApi(configuration);

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
    const { content, messageType } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user?._id;
    let fileUrl = null;
    let fileType = null;
    let fileName = null;

    console.log("Sending message via HTTP:", {
      senderId,
      receiverId,
      content: content || "(empty)",
      hasFile: !!req.file,
      messageType: messageType || "sender",
      user: req.user
    });

    if (!senderId) {
      console.error("No sender ID found in request. User object:", req.user);
      return res.status(400).json({ 
        success: false, 
        message: "Sender ID is required" 
      });
    }

    if (!receiverId) {
      return res.status(400).json({ 
        success: false, 
        message: "Receiver ID is required" 
      });
    }

    // Vérifier le contenu du message pour détecter du contenu inapproprié
    if (content) {
      const isInappropriate = await checkInappropriateContent(content);
      if (isInappropriate) {
        return res.status(400).json({ 
          error: 'Le message contient du contenu inapproprié (propos violents, haineux ou NSFW)' 
        });
      }
    }

    // Traitement du fichier s'il existe
    if (req.file) {
      try {
        // Upload vers Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          resource_type: 'auto',
          folder: 'messages',
        });
        
        fileUrl = result.secure_url;
        fileName = req.file.originalname;
        
        // Déterminer le type de fichier
        if (req.file.mimetype.startsWith('image/')) {
          fileType = 'image';
        } else if (req.file.mimetype.startsWith('audio/')) {
          fileType = 'audio';
        } else {
          fileType = 'document';
        }
        
        // Supprimer le fichier temporaire
        fs.unlinkSync(req.file.path);
      } catch (uploadError) {
        console.error("Error uploading file to Cloudinary:", uploadError);
        return res.status(500).json({ 
          success: false, 
          message: "Failed to upload file" 
        });
      }
    }

    const messageData = {
      senderId,
      receiverId,
      content: content || "",
      fileUrl,
      fileType,
      fileName,
      delivered: true,
      messageType: messageType || "sender"
    };

    console.log("Creating message with data:", messageData);

    const newMessage = new Message(messageData);
    const savedMessage = await newMessage.save();

    console.log("Message saved with ID:", savedMessage._id);

    const populatedMessage = await Message.findById(savedMessage._id)
      .populate('senderId', 'fullName profilePic')
      .populate('receiverId', 'fullName profilePic');

    // Notifier via socket si disponible
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId && io) {
      io.to(receiverSocketId).emit("newMessage", populatedMessage);
    }

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("Error in sendMessage: ", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send message",
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

// Fonction pour vérifier le contenu inapproprié
const checkInappropriateContent = async (text) => {
  try {
    console.log('Vérification du contenu via HTTP:', text);
    
    // Utiliser OpenAI pour la modération
    const response = await openai.createModeration({
      input: text,
    });
    
    const results = response.data.results[0];
    
    console.log('Résultat de la modération:', {
      flagged: results.flagged,
      categories: results.categories
    });
    
    // Vérifier si le contenu est flaggé comme inapproprié
    if (results.flagged) {
      console.log('Contenu inapproprié détecté:', results.categories);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Erreur lors de l\'analyse du contenu avec IA:', error);
    
    // Option de secours: vérification basique par mots-clés
    const forbiddenWords = ['tuer', 'mort', 'violence', 'haine']; // Ajoutez vos mots interdits ici
    const lowerText = text.toLowerCase();
    
    for (const word of forbiddenWords) {
      if (lowerText.includes(word.toLowerCase())) {
        console.log('Mot interdit détecté:', word);
        return true;
      }
    }
    
    return false;
  }
};

module.exports = { getUsersForSidebar, getMessages, sendMessage, markAsRead };





