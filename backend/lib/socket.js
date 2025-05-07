
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const Message = require("../models/message.model"); // Correction de l'import

const app = express();
const server = http.createServer(app);
const onlineUsers = new Map();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  
  console.log("New socket connection attempt:", {
    socketId: socket.id,
    receivedUserId: userId,
    queryParams: socket.handshake.query
  });

  if (!userId || userId === 'undefined' || userId === undefined) {
    console.error("Invalid user ID, closing connection:", userId);
    socket.disconnect(true);
    return;
  }

  socket.userId = userId;
  onlineUsers.set(userId, socket.id);

  const onlineUsersList = Array.from(onlineUsers.keys())
    .filter(id => id && id !== 'undefined');

  console.log("User connected successfully:", {
    socketId: socket.id,
    userId: userId,
    onlineUsers: onlineUsersList
  });

  io.emit("onlineUsers", onlineUsersList);

  socket.on("setup", (setupUserId) => {
    console.log("Setup event received:", {
      socketId: socket.id,
      setupUserId: setupUserId,
      currentUserId: socket.userId
    });

    if (setupUserId && setupUserId !== 'undefined') {
      socket.userId = setupUserId;
      onlineUsers.set(setupUserId, socket.id);
      
      const updatedUsersList = Array.from(onlineUsers.keys())
        .filter(id => id && id !== 'undefined');
      
      io.emit("onlineUsers", updatedUsersList);
    }
  });

  socket.on("sendMessage", async (data) => {
    console.log("Message received:", {
      fromUserId: socket.userId,
      toUserId: data.receiverId,
      socketId: socket.id
    });
    
    try {
      if (!socket.userId) {
        throw new Error("Sender ID not found in socket");
      }

      const messageData = {
        senderId: socket.userId,
        receiverId: data.receiverId,
        content: data.content || "",
        image: data.image || "",
        delivered: true
      };

      const message = await Message.create(messageData);
      const populatedMessage = await Message.findById(message._id)
        .populate('senderId', 'name profilePic')
        .populate('receiverId', 'name profilePic');

      // Récupérer les socket IDs des deux utilisateurs
      const senderSocketId = onlineUsers.get(socket.userId);
      const receiverSocketId = onlineUsers.get(data.receiverId);

      console.log("Socket IDs:", {
        sender: senderSocketId,
        receiver: receiverSocketId,
        onlineUsers: Array.from(onlineUsers.entries())
      });

      // Envoyer à tous les clients concernés
      if (senderSocketId) {
        io.to(senderSocketId).emit("messageSent", populatedMessage);
      }

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", populatedMessage);
      }

      // Broadcast pour synchroniser tous les onglets/fenêtres
      io.emit("messageReceived", {
        message: populatedMessage,
        senderId: socket.userId,
        receiverId: data.receiverId
      });

    } catch (error) {
      console.error("Error in socket message handling:", error);
      socket.emit("messageError", { 
        error: error.message || "Failed to save message"
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", {
      socketId: socket.id,
      userId: socket.userId
    });
    
    if (socket.userId) {
      onlineUsers.delete(socket.userId);
      const remainingUsers = Array.from(onlineUsers.keys())
        .filter(id => id && id !== 'undefined');
      io.emit("onlineUsers", remainingUsers);
    }
  });
});

module.exports = { io, app, server };
