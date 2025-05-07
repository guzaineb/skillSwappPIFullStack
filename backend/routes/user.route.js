const express = require("express");
const protectRoute = require('../middleware/protectRoute.js');
const { followUnfollowUser, getSuggestedUsers, getUserProfile, updateUser,getAllUsers } = require('../controllers/user.controller.js');

const router = express.Router();

router.get("/profile/:username" ,getUserProfile);
router.get("/suggested", getSuggestedUsers);
router.post("/follow/:id",  followUnfollowUser);
router.post("/update", updateUser);

router.get('/',getAllUsers);

module.exports = router; 