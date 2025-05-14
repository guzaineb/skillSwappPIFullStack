var express = require('express');
var passport = require('passport');
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const { ROLES, inRole } = require("../security/Rolemiddelware");

const {
    signup,
    resendVerificationCode,
    updateProfile,
    login,
    logout,
    verifyEmail,
    checkAuth,
    updateUser,
    Test,
    Educator,
    forgetPassWord,
    resetPassword,
    blockStudent,
    getUserSkills
} = require("../controllers/authController");

const {
    AddProfile,
    GetAllProfiles,
    GetProfile,
    DeleteProfile,
    getSkills,
    getUnobtainedSkills,
    addSkill
} = require("../controllers/profile.controllers");

// Auth routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification-code', resendVerificationCode);
router.get('/check-auth', verifyToken, checkAuth);
router.post("/forget-password", forgetPassWord);
router.post("/reset-password/:token", resetPassword);
router.put("/update/:id", updateUser);
router.put("/update-profile", verifyToken, updateProfile);

// Role-based routes (secured)
router.get("/test",
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.LEARNER),
    Test
);

router.get("/educator",
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.EDUCATOR),
    Educator
);

router.get("/admin",
    passport.authenticate('jwt', { session: false }),
    inRole(ROLES.ADMIN),
    (req, res) => {
        res.send("Welcome Admin");
    }
);

// Profile routes
router.post("/profiles", AddProfile);
router.get("/profiles", inRole(ROLES.ADMIN), GetAllProfiles);
router.get("/profile", GetProfile);
router.delete("/profiles/:id", inRole(ROLES.ADMIN), DeleteProfile);
router.post("/profile/:id/add-skill", addSkill);
router.get("/profile/:id/skills", getSkills);
router.get("/profile/:id/unobtained-skills", getUnobtainedSkills);

// Extra functionality
router.put('/block-student/:studentId', blockStudent);
router.get('/user/:userId', getUserSkills);

module.exports = router;
