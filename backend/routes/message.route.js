var express = require('express');
const router = express.Router();
const { getMessages, getUsersForSidebar, sendMessage   } = require("../controllers/messageController");
const verifyToken = require("../middleware/verifyToken");

router.get("/users", verifyToken, getUsersForSidebar);
router.get("/:id", verifyToken, getMessages);

router.post("/send/:id", verifyToken, sendMessage);



module.exports = router; 