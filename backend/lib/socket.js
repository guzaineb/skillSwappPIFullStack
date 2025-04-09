const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

// Configuration améliorée du CORS
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173" // Ajout pour couvrir les accès via IP directe
    ],
    methods: ["GET", "POST"],
    credentials: true
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutes
    skipMiddlewares: true
  }
});

// Stockage des utilisateurs en ligne avec gestion de mémoire
const userSocketMap = new Map(); // Utilisation de Map() pour de meilleures performances

// Gestion des connexions
io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  // Vérification robuste du userId
  const userId = String(socket.handshake.query.userId || "").trim();
  if (!userId) {
    console.warn("Connection without userId, disconnecting...");
    return socket.disconnect(true);
  }

  // Gestion des doublons
  if (userSocketMap.has(userId)) {
    console.warn(`Duplicate connection for user ${userId}`);
    userSocketMap.get(userId).disconnect();
  }

  userSocketMap.set(userId, socket.id);
  updateOnlineUsers();

  // Middleware de vérification pour les événements privés
  socket.use(([event, ...args], next) => {
    if (event.startsWith("private:")) {
      if (!userId) return next(new Error("Unauthorized"));
    }
    next();
  });

  // Gestion des messages privés
  socket.on("private:message", ({ receiverId, message }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("private:message", {
        senderId: userId,
        message,
        timestamp: new Date()
      });
    }
  });

  // Gestion de la déconnexion
  socket.on("disconnect", (reason) => {
    console.log(`Disconnected: ${socket.id} (Reason: ${reason})`);
    if (userId) {
      userSocketMap.delete(userId);
      updateOnlineUsers();
    }
  });

  // Gestion des erreurs
  socket.on("error", (err) => {
    console.error(`Socket error (${socket.id}):`, err);
  });
});

// Mise à jour de la liste des utilisateurs en ligne
function updateOnlineUsers() {
  io.emit("onlineUsers", {
    count: userSocketMap.size,
    users: Array.from(userSocketMap.keys())
  });
}

// Fonction optimisée pour récupérer les sockets
function getReceiverSocketId(userId) {
  return userSocketMap.get(String(userId)) || null;
}

// Health check endpoint
app.get("/socket-health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    connections: userSocketMap.size
  });
});

module.exports = {
  io,
  app,
  server,
  getReceiverSocketId,
  userSocketMap // Export pour le débogage
};