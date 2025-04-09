const Message = require('../models/message.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');
const cloudinary = require('../lib/cloudinary');
const { getReceiverSocketId, io } = require('../index');  // Assure-toi que le chemin est correct


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
        const { id: userToChatId } = req.params;
        const myId = req.user._id; // Ici, on accède à l'utilisateur connecté via req.user

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

  
  // const sendMessage = async (req, res) => {
  //   try {
  //     const { text, image } = req.body;
  //     const { id: receiverId } = req.params;
  //     const senderId = req.user._id;
  
  //     let imageUrl;
  //     if (image) {
  //       // Upload base64 image to Cloudinary
  //       const uploadResponse = await cloudinary.uploader.upload(image);
  //       imageUrl = uploadResponse.secure_url;
  //     }
  
  //     const newMessage = new Message({
  //       senderId,
  //       receiverId,
  //       text,
  //       image: imageUrl,
  //     });
  
  //     await newMessage.save();
  
  //     const receiverSocketId = getReceiverSocketId(receiverId);
  //     if (receiverSocketId) {
  //       io.to(receiverSocketId).emit("newMessage", newMessage);
  //     }
  
  //     res.status(201).json(newMessage);
  //   } catch (error) {
  //     console.log("Error in sendMessage controller: ", error.message);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // };


  const sendMessage = async (req, res) => {
    try {
      console.log("User in sendMessage:", req.user);  // Vérifie si req.user contient bien l'utilisateur
      const { text, image } = req.body;
      const { id: receiverId } = req.params;
  
      // Vérification si senderId est correctement récupéré
      const senderId = req.user?.id || req.user?._id;
      console.log("Sender ID:", senderId);  // Vérifie le senderId ici
  
      if (!senderId) {
        return res.status(400).json({ error: 'Sender ID is missing' });
      }
  
      let imageUrl;
      if (image) {
        // Vérifier l'upload de l'image
        const uploadResponse = await cloudinary.uploader.upload(image);
        console.log("Cloudinary upload response:", uploadResponse); // Vérifie la réponse de Cloudinary
        imageUrl = uploadResponse.secure_url;
      }
  
      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
      });
  
      const savedMessage = await newMessage.save(); // Vérifie la sauvegarde du message
      console.log("Saved message:", savedMessage);
  
      const receiverSocketId = getReceiverSocketId(receiverId); // Utilisation de la fonction getReceiverSocketId
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", savedMessage); // Envoi du message via WebSocket
      }
  
      res.status(201).json(savedMessage);
    } catch (error) {
      console.log("Error in sendMessage controller:", error);  // Affiche l'erreur complète
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  
  module.exports = {getUsersForSidebar, getMessages, sendMessage};