const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/protectRoute.js');
const verifyToken = require('../middleware/verifyToken.js');
const { deleteNotifications, getNotifications } = require('../controllers/notification.controller.js');

// Use verifyToken middleware to ensure user is authenticated
router.get('/getNotifications', verifyToken, getNotifications);
router.delete("/deleteNotifications", verifyToken, deleteNotifications);

module.exports = router;
