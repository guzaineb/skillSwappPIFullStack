const express = require("express");
const protectRoute = require('../middleware/protectRoute.js');
const verifyToken = require('../middleware/verifyToken.js');
const {
	commentOnPost,
	createPost,
	deletePost,
	getAllPosts,
	getFollowingPosts,
	getLikedPosts,
	getUserPosts,
	likeUnlikePost,
} =require('../controllers/post.controller.js');
//const postController = require "../controllers/post.controller.js";

const router = express.Router();

router.get("/all", verifyToken, getAllPosts);
router.get("/following",verifyToken,  getFollowingPosts);
router.get("/likes/:id", verifyToken, getLikedPosts);
router.get("/user/:use,rname",verifyToken, getUserPosts);
router.post("/create",verifyToken ,createPost);
router.post("/like/:id", verifyToken, likeUnlikePost);
router.post("/comment/:id",  verifyToken,commentOnPost);
router.delete("/:id", verifyToken, deletePost);

module.exports = router; 
