const express = require('express');
const router = express.Router();
const {  updatePassword, updateProfilePicture,getProfilePicture } = require('../controllers/updateProfileController');
const verifyToken = require("../middleware/verifyToken");


router.put('/password', verifyToken, updatePassword);
router.put('/profile-picture', verifyToken, updateProfilePicture);
// routes/userRoutes.js
router.get('/profile-picture', verifyToken, getProfilePicture);

module.exports = router;