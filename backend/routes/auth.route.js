var express = require('express');
var passport = require('passport');
const { ROLES, inRole } = require("../security/Rolemiddelware");
const verifyToken = require("../middleware/verifyToken");


const router = express.Router();
const { signup,resendVerificationCode,updateProfile, login, logout, verifyEmail, checkAuth, updateUser,Test,Educator,forgetPassWord, resetPassword,} = require("../controllers/authController");
const { AddProfile, GetAllProfiles, GetProfile, DeleteProfile ,getSkills,
    getUnobtainedSkills,
    addSkill,} = require("../controllers/profile.controllers");
router.put("/update/:id", updateUser);
router.post('/signup', signup);
router.put("/update-profile", verifyToken, updateProfile);
router.post("/forget-password",forgetPassWord);
router.post("/reset-password/:token",resetPassword);
router.post('/login', login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.get("/check-auth", verifyToken, checkAuth);
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
router.post("/profile/:id/add-skill", addSkill); //récupérer un profile
router.get("/profile/:id/skills", getSkills);
router.get("/profile/:id/unobtained-skills", getUnobtainedSkills);
    
router.get("/profile", GetProfile);//récupérer un profile
router.delete("/profiles/:id",inRole(ROLES.ADMIN),DeleteProfile);//supprimer un profile
router.post('/resend-verification-code', resendVerificationCode);


module.exports = router; 