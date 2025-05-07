var express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/protectRoute.js');
const {deleteNotifications, getNotifications } = require('../controllers/notification.controller.js');
//const {deleteNotifications, getNotifications } = require(../controllers/notification.controller.js";



router.get('/getNotifications', getNotifications);
router.delete("/deleteNotifications", deleteNotifications);

module.exports = router;
