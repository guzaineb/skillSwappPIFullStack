const express = require("express");
// const { connectDB } = require("./db/connectDB.js");
const dotenv = require("dotenv");
const mongo = require('mongoose');
const db = require('./db/db.json');
const authRoutes = require("./routes/auth.route.js");
const passport = require("passport");
const cors = require("cors");

dotenv.config(); // Charger les variables d'environnement à partir du fichier .env

const app = express(); 
const PORT = process.env.PORT || 5000; // Définir le port
// Connect to the database
mongo.connect(db.url)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err));

app.use(express.json()); // Middleware pour analyser les payloads JSON entrants
app.use("/api/auth", authRoutes); // Middleware pour les routes d'authentification
app.use(passport.initialize()); // Initialiser Passport pour l'authentification
app.use(
    cors({
      origin: "http://localhost:5173",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
// Lancer le serveur
app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
    // connectDB(); // Connecter à la base de données après le démarrage du serveur
});
