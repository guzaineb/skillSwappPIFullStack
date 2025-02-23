var express = require('express');
var passport = require('passport');
const { ROLES, inRole } = require("../security/Rolemiddelware");

const router = express.Router(); // Créer un routeur
const { signup, login, logout, verifyEmail, Test, Admin } = require("../controllers/authController");

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post("/verify-email", verifyEmail);

router.get("/test", passport.authenticate('jwt', { session: false }),
    inRole(ROLES.LEARNER),
    Test);

// Route pour admin
router.get("/admin", passport.authenticate('jwt', { session: false }), Admin);

module.exports = router; // Exporter le routeur
