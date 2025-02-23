const express = require("express");
const { connectDB } = require("./db/connectDB.js");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.route.js");
const passport = require("passport");
dotenv.config(); // Charger les variables d'environnement à partir du fichier .env

const app = express(); 
const PORT = process.env.PORT || 5000; // Définir le port

app.use(express.json()); // Middleware pour analyser les payloads JSON entrants
app.use("/api/auth", authRoutes); // Middleware pour les routes d'authentification
app.use(passport.initialize()); // Initialiser Passport pour l'authentification
require('./security/passport')(passport)
// Lancer le serveur
app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
    connectDB(); // Connecter à la base de données après le démarrage du serveur
});
