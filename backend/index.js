const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const passportsetup=require("./service/passport.js")

const passport = require("passport");

const authRoutes = require("./routes/auth.route.js");
const skillRoutes = require("./routes/skill.route.js");
const categoryRoutes = require("./routes/category.route.js");
const messageRoutes = require("./routes/message.route.js");
const updateProfileRoutes = require("./routes/updateProfileRoutes.js")
const googleRoutes = require("./routes/auth.go.js");
const payRoutes = require("./routes/pay.route.js");
const quizRoutes = require("./routes/quiz.route.js");
const openaiRoutes = require("./routes/openaiRoutes.js");
const {app,server} = require("./lib/socket.js")
const db = require("./db/db.json");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const path = require('path');

const { OpenAI } = require('openai');  // Importation de OpenAI

dotenv.config();

const PORT = process.env.PORT || 5000;
const { Configuration, OpenAIApi } = require('openai');
dotenv.config();
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
// Serve uploaded images statically

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
app.use("/api/category", categoryRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/skill", skillRoutes);
app.use("/api/message", messageRoutes);
app.use("/auth", googleRoutes);
app.use("/api", updateProfileRoutes);
app.use("/api/openai", openaiRoutes);
app.use("/api/pay", payRoutes);
app.use("/api/quiz", quizRoutes);

app.use(express.urlencoded({ extended: true }));


// Lancement du serveur
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Utilisation de ta clé API OpenAI
  apiBaseUrl: 'https://api.openai.com/v1/',  // URL de base pour l'API OpenAI
});
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema/shema.js");
const resolvers = require("./schema/resolvers");

async function startApolloServer() {
  const graphqlServer = new ApolloServer({ typeDefs, resolvers });

  await graphqlServer.start();
  graphqlServer.applyMiddleware({ app, path: "/graphql" }); // <- Route GraphQL

  console.log(`🚀 Apollo Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`);
}

startApolloServer(); // Lance Apollo GraphQL
