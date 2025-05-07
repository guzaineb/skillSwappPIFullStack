const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const passportsetup = require("./service/passport.js");
const passport = require("passport");
const authRoutes = require("./routes/auth.route.js");
const skillRoutes = require("./routes/skill.route.js");
const categoryRoutes = require("./routes/category.route.js");
const messageRoutes = require("./routes/message.route.js");
const updateProfileRoutes = require("./routes/updateProfileRoutes.js");
const googleRoutes = require("./routes/auth.go.js");
const payRoutes = require("./routes/pay.route.js");
const quizRoutes = require("./routes/quiz.route.js");
const {app, server} = require("./lib/socket.js");
const db = require("./db/db.json");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const path = require('path');
const userRoutes = require('./routes/user.route');
const adminRoutes = require("./routes/admin.route");
// Configuration de l'environnement
dotenv.config();

const PORT = process.env.PORT || 5001; // Changé à 5001 pour éviter les conflits

// Connexion à la base de données (version modernisée)
mongoose.connect(process.env.MONGO_URI || db.url)
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Fonction pour générer des données de graphique
const generateChartData = (days = 7, min = 5, max = 20) => {
  return Array.from({length: days}, (_, i) => ({
    jour: `Day ${i + 1}`,  // Change "day" to "jour"
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
    res.status(500).json({error: 'Internal server error'});
  }
});

// Routes API
app.use("/api/auth", authRoutes);
app.use("/api/skill", skillRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes); // Route des utilisateurs placée avant les autres
app.use("/api/profile", updateProfileRoutes);
app.use("/api/pay", payRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/admin", adminRoutes);
// Routes d'authentification tierces
app.use("/auth", googleRoutes);

// Gestion des erreurs (nouveau middleware)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Gestion du port déjà utilisé
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use. Trying another port...`);
    const newPort = PORT + 1;
    server.listen(newPort, () => {
      console.log(`Server now running on port ${newPort}`);
    });
  } else {
    console.error('Server error:', error);
  }
});

// Lancement du serveur
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});