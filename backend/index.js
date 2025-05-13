const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema/shema.js");
const resolvers = require("./schema/resolvers");
const initializeMeetingSocket = require("./socket/meetingSocket");

// Chargement des variables d'environnement
dotenv.config();

// Initialisation Express & HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI || process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Initialisation des middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialisation Socket.io (réunions, chat, etc.)
initializeMeetingSocket(io);

// Initialisation Chatbots
const chatbot = require("./chatbot");
const advancedChatbot = require("./advancedChatbot");
(async () => {
  await chatbot.loadModel();
  await advancedChatbot.loadModel();
  console.log("✅ Chatbots initialisés avec succès");
})();

// Routes API
app.use("/api/auth", require("./routes/auth.route.js"));
app.use("/api/users", require("./routes/user.route.js"));
app.use("/api/skill", require("./routes/skill.route.js"));
app.use("/api/category", require("./routes/category.route.js"));
app.use("/api/message", require("./routes/message.route.js"));
app.use("/api/pay", require("./routes/pay.route.js"));
app.use("/api/quiz", require("./routes/quiz.route.js"));
app.use("/api/notification", require("./routes/notification.route.js"));
app.use("/api/post", require("./routes/post.route.js"));
app.use("/api/admin", require("./routes/admin.route.js"));
app.use("/api/skill-response", require("./routes/skillResponse.route.js"));
app.use("/api/meetings", require("./routes/meeting.route.js"));
app.use("/auth", require("./routes/auth.go.js"));
app.use("/api", require("./routes/updateProfileRoutes.js"));
app.use("/api/openai", require("./routes/openaiRoutes.js"));
app.use("/api/chatbot", require("./api"));
app.use("/api/advanced-chatbot", require("./advancedChatbotApi"));
app.use("/api/tasks", require("./routes/tasks.route.js"));

// Route test
app.get("/", (req, res) => {
  res.send("API en ligne");
});

// Endpoint des données pour les graphiques
const generateChartData = (days = 7, min = 5, max = 20) => {
  return Array.from({ length: days }, (_, i) => ({
    jour: `Day ${i + 1}`,
    valeur: Math.floor(Math.random() * (max - min + 1)) + min,
  }));
};

app.get("/api/chart-data", (req, res) => {
  try {
    const data = {
      teachersData: generateChartData(7, 2, 10),
      studentsData: generateChartData(7, 10, 50),
      quizzesTakenData: generateChartData(7, 5, 30),

      activeQuizzesData: generateChartData(7, 1, 15),
    };
    res.json(data);
  } catch (error) {
    console.error("Error generating chart data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Apollo GraphQL
async function startApolloServer() {
  const graphqlServer = new ApolloServer({ typeDefs, resolvers });
  await graphqlServer.start();
  graphqlServer.applyMiddleware({ app, path: "/graphql" });
  console.log(
    `🚀 Apollo Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`
  );
}
startApolloServer();

// Démarrage serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
  console.log(
    `🌐 Socket.io & GraphQL opérationnels sur http://localhost:${PORT}`
  );
});
