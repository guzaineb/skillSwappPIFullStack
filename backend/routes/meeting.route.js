const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meeting.controller');
const protectRoute = require('../middleware/protectRoute');

// Créer une nouvelle réunion
router.post('/', protectRoute, meetingController.createMeeting);

// Obtenir les détails d'une réunion
router.get('/:meetingId', meetingController.getMeetingDetails);

// Rejoindre une réunion
router.post('/:meetingId/join', protectRoute, meetingController.joinMeeting);

// Quitter une réunion
router.post('/:meetingId/leave', protectRoute, meetingController.leaveMeeting);

// Terminer une réunion
router.put('/:meetingId/end', protectRoute, meetingController.endMeeting);

router.get('/user/meetings', protectRoute, meetingController.getUserMeetings);

module.exports = router;