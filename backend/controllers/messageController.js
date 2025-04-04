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

  
const sendMessage = async (req, res) => {
  try {
    const { text, image, receiverId } = req.body; // receiverId vient du body
    const { senderId } = req.params; // senderId vient de l'URL

    console.log("Sender ID from URL:", senderId);
    console.log("Receiver ID from body:", receiverId);

    if (!senderId || !receiverId) {
      return res.status(400).json({ error: 'Sender or receiver ID is missing' });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log('Error in sendMessage controller: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};



  // const sendMessage = async (req, res) => {
  //   try {
  //     const { text, image } = req.body;
  //     const { senderId, receiverId } = req.params; // 👈 Récupère les deux IDs depuis l'URL
  
  //     console.log("Sender ID from URL:", senderId);
  //     console.log("Receiver ID from URL:", receiverId);
  
  //     if (!senderId || !receiverId) {
  //       return res.status(400).json({ error: 'Sender or receiver ID is missing' });
  //     }
  
  //     let imageUrl;
  //     if (image) {
  //       const uploadResponse = await cloudinary.uploader.upload(image);
  //       console.log("Cloudinary upload response:", uploadResponse);
  //       imageUrl = uploadResponse.secure_url;
  //     }
  
  //     const newMessage = new Message({
  //       senderId,
  //       receiverId,
  //       text,
  //       image: imageUrl,
  //     });
  
  //     const savedMessage = await newMessage.save();
  //     console.log("Saved message:", savedMessage);
  
  //     const receiverSocketId = getReceiverSocketId(receiverId);
  //     if (receiverSocketId) {
  //       io.to(receiverSocketId).emit("newMessage", savedMessage);
  //     }
  
  //     res.status(201).json(savedMessage);
  //   } catch (error) {
  //     console.log("Error in sendMessage controller:", error);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // };
  
  
  
  
  
  
  module.exports = {getUsersForSidebar, getMessages, sendMessage};