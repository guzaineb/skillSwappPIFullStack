
const Message = require('../models/message.model');
const fs = require('fs');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');
const config = require('../config/config');

// Configuration OpenAI
const configuration = new Configuration({
  apiKey: config.openai.apiKey,
});
const openai = new OpenAIApi(configuration);

const onlineUsers = new Map();

function getReceiverSocketId(receiverId) {
  return onlineUsers.get(receiverId);
}

// Fonction pour vérifier le contenu inapproprié
async function checkInappropriateContent(text) {
  try {
    console.log('Vérification du contenu via socket:', text);
    
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
}

function initSocket(io) {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    // Événement pour enregistrer l'utilisateur connecté
    socket.on('addNewUser', (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit('getOnlineUsers', Array.from(onlineUsers.keys()));
      console.log('User added:', userId, 'Socket ID:', socket.id);
      console.log('Online users:', Array.from(onlineUsers.entries()));
    });

    // Événement pour envoyer un message
    socket.on('sendMessage', async (message) => {
      console.log('Message received via socket:', message);
      
      try {
        // Vérifier que senderId est présent
        if (!message.senderId) {
          throw new Error("senderId is required");
        }
        
        // Vérifier le contenu du message pour détecter du contenu inapproprié
        if (message.content) {
          const isInappropriate = await checkInappropriateContent(message.content);
          if (isInappropriate) {
            socket.emit('messageError', { 
              error: 'Le message contient du contenu inapproprié (propos violents, haineux ou NSFW)' 
            });
            return; // Arrêter le traitement du message
          }
        }
        
        const receiverSocketId = getReceiverSocketId(message.receiverId);
        
        // Sauvegarder le message dans la base de données
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
        
        // Récupérer le message avec les informations de l'utilisateur
        const populatedMessage = await Message.findById(savedMessage._id)
          .populate('senderId', 'fullName profilePic')
          .populate('receiverId', 'fullName profilePic');
        
        // Envoyer le message au destinataire s'il est en ligne
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('newMessage', populatedMessage);
          console.log('Message sent to socket:', receiverSocketId);
        }
        
        // Confirmer l'envoi à l'expéditeur
        socket.emit('messageSent', populatedMessage);
        
      } catch (error) {
        console.error('Error sending message via socket:', error);
        socket.emit('messageError', { error: error.message });
      }
    });

    // Événement pour marquer un message comme lu
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

    // Événement de déconnexion
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
      
      // Supprimer l'utilisateur de la liste des utilisateurs en ligne
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




