// Importations des modules
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

// Configuration des variables d'environnement
dotenv.config();

// Création de l'application Express
const app = express();
const server = http.createServer(app);

// Configuration de Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Importation des services et modules personnalisés
const passportsetup = require("./service/passport.js");
const chatbot = require('./chatbot');
const chatbotApi = require('./api');
const advancedChatbot = require('./advancedChatbot');
const advancedChatbotApi = require('./advancedChatbotApi');

// Importation des routes
const authRoutes = require("./routes/auth.route.js");
const skillRoutes = require("./routes/skill.route.js");
const categoryRoutes = require("./routes/category.route.js");
const messageRoutes = require("./routes/message.route.js");
const updateProfileRoutes = require("./routes/updateProfileRoutes.js");
const googleRoutes = require("./routes/auth.go.js");
const payRoutes = require("./routes/pay.route.js");
const quizRoutes = require("./routes/quiz.route.js");
const openaiRoutes = require("./routes/openaiRoutes.js");
const notificationRoutes = require("./routes/notification.route.js");
const userRoutes = require("./routes/user.route.js");
const postRoutes = require("./routes/post.route.js");
const adminRoutes = require("./routes/admin.route.js"); // Ajout de l'extension .js
const skillResponseRoutes = require("./routes/skillResponse.route.js");

// Vérification des routes importées
console.log("Routes importées:");
console.log("authRoutes:", typeof authRoutes, authRoutes);
console.log("skillRoutes:", typeof skillRoutes, skillRoutes);
console.log("categoryRoutes:", typeof categoryRoutes, categoryRoutes);
console.log("messageRoutes:", typeof messageRoutes, messageRoutes);
console.log("updateProfileRoutes:", typeof updateProfileRoutes, updateProfileRoutes);
console.log("googleRoutes:", typeof googleRoutes, googleRoutes);
console.log("payRoutes:", typeof payRoutes, payRoutes);
console.log("quizRoutes:", typeof quizRoutes, quizRoutes);
console.log("openaiRoutes:", typeof openaiRoutes, openaiRoutes);
console.log("notificationRoutes:", typeof notificationRoutes, notificationRoutes);
console.log("userRoutes:", typeof userRoutes, userRoutes);
console.log("postRoutes:", typeof postRoutes, postRoutes);
console.log("adminRoutes:", typeof adminRoutes, adminRoutes);
console.log("skillResponseRoutes:", typeof skillResponseRoutes, skillResponseRoutes);


// Configuration de la base de données
const db = require("./db/db.json");
const PORT = process.env.PORT || 5000;

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI || db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Configuration des middlewares
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));

// Initialisation des chatbots
(async () => {
  try {
    await chatbot.loadModel();
    await advancedChatbot.loadModel();
    console.log("✅ Chatbots initialisés avec succès");
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation des chatbots:", error);
  }
})();

// Configuration des routes - Ajoutons-les une par une pour identifier celle qui pose problème
try {
  app.use("/api/category", categoryRoutes);
  console.log("✅ categoryRoutes ajouté avec succès");
} catch (error) {
  console.error("❌ Erreur avec categoryRoutes:", error);
}

try {
  app.use('/api/chatbot', chatbotApi);
  console.log("✅ chatbotApi ajouté avec succès");
} catch (error) {
  console.error("❌ Erreur avec chatbotApi:", error);
}

try {
  app.use('/api/advanced-chatbot', advancedChatbotApi);
  console.log("✅ advancedChatbotApi ajouté avec succès");
} catch (error) {
  console.error("❌ Erreur avec advancedChatbotApi:", error);
}

try {
  app.use("/api/auth", authRoutes);
  console.log("✅ authRoutes ajouté avec succès");
} catch (error) {
  console.error("❌ Erreur avec authRoutes:", error);
}
app.use("/api/tasks", require("./routes/tasks.route.js"));


try {
  app.use("/api/skill", skillRoutes);
  console.log("✅ skillRoutes ajouté avec succès");
} catch (error) {
  console.error("❌ Erreur avec skillRoutes:", error);
}

try {
  app.use("/api/message", messageRoutes);
  console.log("✅ messageRoutes ajouté avec succès");
} catch (error) {
  console.error("❌ Erreur avec messageRoutes:", error);
}

try {
  app.use("/auth", googleRoutes);
  console.log("✅ googleRoutes ajouté avec succès");
} catch (error) {
  console.error("❌ Erreur avec googleRoutes:", error);
}

try {
  app.use("/api", updateProfileRoutes);
  console.log("✅ updateProfileRoutes ajouté avec succès");
} catch (error) {
  console.error("❌ Erreur avec updateProfileRoutes:", error);
}

try {
  app.use("/api/openai", openaiRoutes);
  console.log("✅ openaiRoutes ajouté avec succès");
} catch (error) {
  console.error("❌ Erreur avec openaiRoutes:", error);
}

try {
  app.use("/api/pay", payRoutes);
  console.log("✅ payRoutes ajouté avec succès");
} catch (error) {
  console.error("❌ Erreur avec payRoutes:", error);
}

try {
  app.use("/api/quiz", quizRoutes);
  console.log("✅ quizRoutes ajouté avec succès");
} catch (error) {
  console.error("❌ Erreur avec quizRoutes:", error);
}

try {
  app.use("/api/notification", notificationRoutes);
  console.log("✅ notificationRoutes ajouté avec succès");
} catch (error) {
  console.error("❌ Erreur avec notificationRoutes:", error);
}

try {
  app.use("/api/user", userRoutes);
  console.log("✅ userRoutes ajouté avec succès");
} catch (error) {
  console.error("❌ Erreur avec userRoutes:", error);
}

try {
  app.use("/api/post", postRoutes);
  console.log("✅ postRoutes ajouté avec succès");
} catch (error) {
  console.error("❌ Erreur avec postRoutes:", error);
}

try {
  app.use("/api/admin", adminRoutes);
  console.log("✅ adminRoutes ajouté avec succès");
} catch (error) {
  console.error("❌ Erreur avec adminRoutes:", error);
}

try {
  app.use("/api/skill-response", skillResponseRoutes);
  console.log("✅ skillResponseRoutes ajouté avec succès");
} catch (error) {
  console.error("❌ Erreur avec skillResponseRoutes:", error);
}

// Fonction pour générer des données de graphique
const generateChartData = (days = 7, min = 5, max = 20) => {
  return Array.from({ length: days }, (_, i) => ({
    jour: `Day ${i + 1}`,
    valeur: Math.floor(Math.random() * (max - min + 1)) + min
  }));
};

// Endpoint pour les données des graphiques
app.get('/api/chart-data', (req, res) => {
  try {
    const data = {
      teachersData: generateChartData(7, 2, 10),
      studentsData: generateChartData(7, 10, 50),
      quizzesTakenData: generateChartData(7, 5, 30),
      activeQuizzesData: generateChartData(7, 1, 15)
    };
    res.json(data);
  } catch (error) {
    console.error('Error generating chart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Configuration d'Apollo Server
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema/shema.js");
const resolvers = require("./schema/resolvers");

async function startApolloServer() {
  const graphqlServer = new ApolloServer({ typeDefs, resolvers });

  await graphqlServer.start();
  graphqlServer.applyMiddleware({ app, path: "/graphql" });

  console.log(`🚀 Apollo Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`);
}

// Démarrage du serveur
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// Démarrage d'Apollo Server
startApolloServer().catch(err => {
  console.error("❌ Error starting Apollo Server:", err);
});

// Configuration des événements Socket.io
io.on('connection', (socket) => {
  console.log('Un utilisateur s\'est connecté:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté:', socket.id);
  });
  
  // Ajouter ici les autres gestionnaires d'événements socket
});

// Export pour les tests ou autres modules
module.exports = { app, server, io };
