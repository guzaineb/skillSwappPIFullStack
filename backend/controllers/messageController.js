const Message = require('../models/message.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');
const cloudinary = require('../lib/cloudinary');
const { getReceiverSocketId, io } = require('../lib/socket');  // Assure-toi que le chemin est correct


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
    const { id: userToChatId } = req.params; // Récupère l'ID du destinataire du chat
    const myId = req.user._id; // Récupère l'ID de l'utilisateur connecté

    // Recherche des messages entre l'utilisateur connecté et l'autre utilisateur
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId }, // Messages envoyés par l'utilisateur connecté
        { senderId: userToChatId, receiverId: myId }, // Messages envoyés par l'autre utilisateur
      ],
    });

    // Retourne les messages trouvés
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message); // Log de l'erreur
    res.status(500).json({ error: "Internal server error" }); // Retourne une erreur 500 en cas d'échec
  }
};


const sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const image = req.file?.path; // Assurez-vous que multer est configuré correctement
    const receiverId = req.params.id;
    const senderId = req.user?.id;

    if (!senderId || !receiverId) {
      return res.status(400).json({ 
        success: false, 
        message: "Both sender and receiver IDs are required" 
      });
    }

    const messageData = {
      senderId,
      receiverId,
      content: content || "",
      image: image || "",
      delivered: true
    };

    const newMessage = new Message(messageData);
    await newMessage.save();

    const populatedMessage = await Message.findById(newMessage._id)
      .populate('senderId', 'fullName profilePic')
      .populate('receiverId', 'fullName profilePic');

    return res.status(201).json(populatedMessage);

  } catch (error) {
    console.error("Error in sendMessage:", error);
    return res.status(400).json({ 
      success: false, 
      message: error.message || "Failed to send message"
    });
  }
};


 module.exports = {getUsersForSidebar, getMessages, sendMessage};
