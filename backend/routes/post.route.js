const express = require("express");
const protectRoute = require('../middleware/protectRoute.js');
const verifyToken = require('../middleware/verifyToken.js');
const upload = require('../middleware/uploadMiddleware.js');
const {
	commentOnPost,
	createPost,
	deletePost,
	getAllPosts,
	getFollowingPosts,
	getLikedPosts,
	getUserPosts,
	likeUnlikePost,
	likeUnlikeComment,
	dislikeUnlikeComment,
	replyToComment,
	likeUnlikeReply,
	dislikeUnlikeReply,
} = require('../controllers/post.controller.js');

const router = express.Router();

router.get("/all", verifyToken, getAllPosts);
router.get("/following", verifyToken, getFollowingPosts);
router.get("/likes/:id", verifyToken, getLikedPosts);
router.get("/user/:username", verifyToken, getUserPosts);
router.post("/create", verifyToken, upload.single('image'), createPost);
router.post("/like/:id", verifyToken, likeUnlikePost);
router.post("/comment/:id", verifyToken, commentOnPost);
router.post("/comment/:postId/:commentId/like", verifyToken, likeUnlikeComment);
router.post("/comment/:postId/:commentId/dislike", verifyToken, dislikeUnlikeComment);
router.post("/comment/:postId/:commentId/reply", verifyToken, replyToComment);
router.post("/comment/:postId/:commentId/reply/:replyId/like", verifyToken, likeUnlikeReply);
router.post("/comment/:postId/:commentId/reply/:replyId/dislike", verifyToken, dislikeUnlikeReply);
router.delete("/:id", verifyToken, deletePost);

module.exports = router;
