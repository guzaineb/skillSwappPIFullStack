const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose"); 
const db = require("./db/db.json");
const authRoutes = require("./routes/auth.route.js");
const skillRoutes = require("./routes/skill.route.js");
const passport = require("passport");
const crypto = require("crypto");

dotenv.config(); // Charger les variables d'environnement

const app = express();
const PORT = process.env.PORT || 5000;

// Connexion à la base de données
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use(passport.initialize());
require("./security/passport")(passport); // Charger la configuration de Passport

app.use("/api/auth", authRoutes);
app.use("/api/skill", skillRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
