const Message = require('../models/message.model');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai'); // ✅ Nouveau import pour openai v4
const config = require('../config/config');

// ✅ Configuration de l'API OpenAI avec la v4
const openai = new OpenAI({
  apiKey: config.openai.apiKey,
});

const onlineUsers = new Map();

function getReceiverSocketId(receiverId) {
  return onlineUsers.get(receiverId);
}

// ✅ Fonction pour vérifier le contenu inapproprié
async function checkInappropriateContent(text) {
  try {
    console.log('Vérification du contenu via socket:', text);

    // Utiliser OpenAI v4 pour la modération
    const response = await openai.moderations.create({
      input: text,
    });

    const results = response.results[0]; // ✅ Plus de .data
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
    console.error('Erreur lors de l\'analyse du contenu avec IA:', error);

    // Option de secours: vérification basique
    const forbiddenWords = ['tuer', 'mort', 'violence', 'haine'];
    const lowerText = text.toLowerCase();

    for (const word of forbiddenWords) {
      if (lowerText.includes(word.toLowerCase())) {
        console.log('Mot interdit détecté:', word);
        return true;
      }
    }

    return false;
  }
}

function initSocket(io) {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('addNewUser', (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit('getOnlineUsers', Array.from(onlineUsers.keys()));
      console.log('User added:', userId, 'Socket ID:', socket.id);
      console.log('Online users:', Array.from(onlineUsers.entries()));
    });

    socket.on('sendMessage', async (message) => {
      console.log('Message received via socket:', message);

      try {
        if (!message.senderId) {
          throw new Error("senderId is required");
        }

        if (message.content) {
          const isInappropriate = await checkInappropriateContent(message.content);
          if (isInappropriate) {
            socket.emit('messageError', {
              error: 'Le message contient du contenu inapproprié (propos violents, haineux ou NSFW)',
            });
            return;
          }
        }

        const receiverSocketId = getReceiverSocketId(message.receiverId);

        const newMessage = new Message({
          senderId: message.senderId,
          receiverId: message.receiverId,
          content: message.content || "",
          fileUrl: message.fileUrl || null,
          fileType: message.fileType || null,
          fileName: message.fileName || null,
          delivered: true,
          messageType: message.messageType || 'sender'
        });

        const savedMessage = await newMessage.save();
        console.log('Message saved with ID:', savedMessage._id);

        const populatedMessage = await Message.findById(savedMessage._id)
          .populate('senderId', 'fullName profilePic')
          .populate('receiverId', 'fullName profilePic');

        if (receiverSocketId) {
          io.to(receiverSocketId).emit('newMessage', populatedMessage);
          console.log('Message sent to socket:', receiverSocketId);
        }

        socket.emit('messageSent', populatedMessage);
      } catch (error) {
        console.error('Error sending message via socket:', error);
        socket.emit('messageError', { error: error.message });
      }
    });

    socket.on('markAsRead', async (messageId) => {
      try {
        const message = await Message.findByIdAndUpdate(
          messageId,
          { read: true },
          { new: true }
        );

        if (message) {
          const receiverSocketId = getReceiverSocketId(message.senderId.toString());
          if (receiverSocketId) {
            io.to(receiverSocketId).emit('messageRead', messageId);
          }
        }
      } catch (error) {
        console.error('Error marking message as read:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);

      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          io.emit('getOnlineUsers', Array.from(onlineUsers.keys()));
          console.log('User removed:', userId);
          break;
        }
      }
    });
  });
}

module.exports = { initSocket, getReceiverSocketId };
