const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const passportsetup = require("./service/passport.js")
const chatbot = require('./chatbot');
const chatbotApi = require('./api');
const advancedChatbot = require('./advancedChatbot');
const advancedChatbotApi = require('./advancedChatbotApi');
const passport = require("passport");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

// Créer l'application Express
const app = express();
// Créer le serveur HTTP
const server = http.createServer(app);

// Importer les routes
const authRoutes = require("./routes/auth.route.js");
const skillRoutes = require("./routes/skill.route.js");
const categoryRoutes = require("./routes/category.route.js");
const messageRoutes = require("./routes/message.route.js");
const updateProfileRoutes = require("./routes/updateProfileRoutes.js")
const googleRoutes = require("./routes/auth.go.js");
const payRoutes = require("./routes/pay.route.js");
const quizRoutes = require("./routes/quiz.route.js");
const openaiRoutes = require("./routes/openaiRoutes.js");
const notificationRoutes = require("./routes/notification.route.js");
const userRoutes = require("./routes/user.route.js");
const postRoutes = require("./routes/post.route.js");
const adminRoutes = require("./routes/admin.route");
const skillResponseRoutes = require("./routes/skillResponse.route.js");
const aiQuizRoutes = require('./routes/aiQuiz.routes');

const db = require("./db/db.json");
const { OpenAI } = require('openai');

dotenv.config();

const PORT = process.env.PORT || 5000;
const { Configuration, OpenAIApi } = require('openai');

// Initialiser Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Gérer les connexions Socket.io
io.on('connection', (socket) => {
  console.log('Un utilisateur s\'est connecté:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté:', socket.id);
  });
  
  // Ajouter ici les autres gestionnaires d'événements socket
});

// Connexion à la base de données
mongoose
  .connect(process.env.MONGO_URI || db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Initialiser les chatbots
(async () => {
  await chatbot.loadModel();
  await advancedChatbot.loadModel();
  console.log("✅ Chatbots initialisés avec succès");
})();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/category", categoryRoutes);
app.use('/api/chatbot', chatbotApi);
app.use('/api/advanced-chatbot', advancedChatbotApi);
app.use("/api/auth", authRoutes);
app.use("/api/skill", skillRoutes);
app.use("/api/message", messageRoutes);
app.use("/auth", googleRoutes);
app.use("/api", updateProfileRoutes);
app.use("/api/openai", openaiRoutes);
app.use("/api/pay", payRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/skill-response", skillResponseRoutes);
app.use('/api/ai-quiz', aiQuizRoutes);

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

const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema/shema.js");
const resolvers = require("./schema/resolvers");

async function startApolloServer() {
  const graphqlServer = new ApolloServer({ typeDefs, resolvers });

  await graphqlServer.start();
  graphqlServer.applyMiddleware({ app, path: "/graphql" });

  console.log(`🚀 Apollo Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`);
}

// Lancement du serveur
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

startApolloServer(); // Lance Apollo GraphQL
