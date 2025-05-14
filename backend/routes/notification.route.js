const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken.js');
const {
    deleteNotifications,
    getNotifications
} = require('../controllers/notification.controller.js');

// Routes pour les notifications standard
router.get('/getNotifications', verifyToken, getNotifications);
router.delete("/deleteNotifications", verifyToken, deleteNotifications);

// Commentez ou supprimez ces routes jusqu'à ce que vous ayez implémenté les contrôleurs
// router.post("/facial-expression", verifyToken, createFacialExpressionNotification);
// router.post("/meeting", verifyToken, createMeetingNotification);

module.exports = router;
