const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const passportsetup=require("./service/passport.js")

const passport = require("passport");

const authRoutes = require("./routes/auth.route.js");
const skillRoutes = require("./routes/skill.route.js");
const messageRoutes = require("./routes/message.route.js");
const googleRoutes = require("./routes/auth.go.js");

const db = require("./db/db.json");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");


const app = express();
const PORT = process.env.PORT || 5000;

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

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/skill", skillRoutes);
app.use("/api/message", messageRoutes);
app.use("/auth", googleRoutes);


// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});
