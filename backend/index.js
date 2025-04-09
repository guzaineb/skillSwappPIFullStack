// const express = require("express");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const passport = require("passport");
// const authRoutes = require("./routes/auth.route.js");
// const skillRoutes = require("./routes/skill.route.js");
// const messageRoutes = require("./routes/message.route.js");

// const db = require("./db/db.json");
// const cookieParser = require("cookie-parser");
// const crypto = require("crypto");


// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connexion à la base de données
// mongoose
//   .connect(process.env.MONGO_URI || db.url, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // Middleware
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(cookieParser());
// app.use(passport.initialize());
// require("./security/passport")(passport); // Charger la configuration de Passport

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/skill", skillRoutes);
// app.use("/api/message", messageRoutes);


// // Lancement du serveur
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port: ${PORT}`);
// });

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const http = require("http");
const authRoutes = require("./routes/auth.route.js");
const skillRoutes = require("./routes/skill.route.js");
const messageRoutes = require("./routes/message.route.js");
const db = require("./db/db.json");

// Initialisation des variables d'environnement
dotenv.config();

const app = express();
const server = http.createServer(app); // Crée une instance HTTP pour Express

// Initialisation de Socket.io avec la configuration CORS pour le frontend
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Utilisation de socket pour gérer les connexions en temps réel
const userSocketMap = {}; // Utilisé pour stocker les utilisateurs en ligne

// Fonction pour obtenir l'ID de socket du récepteur
function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("Un utilisateur est connecté", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // Émettre les utilisateurs en ligne à tous les clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Connexion à la base de données MongoDB
mongoose
  .connect(process.env.MONGO_URI || db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connexion à MongoDB réussie"))
  .catch((err) => console.error("❌ Erreur de connexion à MongoDB:", err));

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
require("./security/passport")(passport); // Charger la configuration de Passport

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/skill", skillRoutes);
app.use("/api/message", messageRoutes);

// Lancer le serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur en cours d'exécution sur le port: ${PORT}`);
});

// Exportation de la fonction et des objets nécessaires
module.exports = { getReceiverSocketId, userSocketMap, io };
