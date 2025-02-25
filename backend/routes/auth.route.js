var express = require('express');
var passport = require('passport');
const { ROLES, inRole } = require("../security/Rolemiddelware");

const router = express.Router(); // Créer un routeur
const { signup, login, logout, verifyEmail,register,  verifyEmailOtp,Test,Educator,} = require("../controllers/authController");
const { AddProfile, GetAllProfiles, GetProfile, DeleteProfile } = require("../controllers/profile.controllers");

router.post('/signup', signup);

router.post('/register', register);

router.post('/login', login);
router.post('/logout', logout);
router.post("/verify-email", verifyEmail);
// router.get("/test", passport.authenticate('jwt', { session: false }),
//     inRole(ROLES.LEARNER),
//     Test);

//  router.get("/educator", passport.authenticate('jwt', { session: false }),
// inRole(ROLES.EDUCATOR),
// Educator);
// // Route pour admin
// router.get("/admin", passport.authenticate('jwt', { session: false }), inRole(ROLES.ADMIN), Admin);


router.post("/profiles",AddProfile);//ajouter un profile

router.get("/profiles",inRole(ROLES.ADMIN),GetAllProfiles);//récupérer tous les profiles
    
router.get("/profile", GetProfile);//récupérer un profile
router.delete("/profiles/:id",inRole(ROLES.ADMIN),DeleteProfile);//supprimer un profile
module.exports = router; 