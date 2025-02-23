var express = require('express');
var passport = require('passport');
const { ROLES, inRole } = require("../security/Rolemiddelware");

const router = express.Router(); // Créer un routeur
const { signup, login, logout, verifyEmail, Test,Educator,GetAllProfiles, Admin,GetProfile ,AddProfile,DeleteProfile} = require("../controllers/authController");

router.post('/signup', signup);
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


router.post("/profiles", passport.authenticate('jwt', { session: false }),
AddProfile);

router.get("/profiles", passport.authenticate('jwt', { session: false }),
GetAllProfiles);
    
router.get("/profile", passport.authenticate('jwt', { session: false }),
GetProfile);
router.delete("/profiles/:id", passport.authenticate('jwt', { session: false }),
DeleteProfile);
module.exports = router; // Exporter le routeur
