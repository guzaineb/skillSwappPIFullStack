var express = require('express');

const router = express.Router(); // Créer un routeur
const { sendInvitationEmail} = require("../controllers/invitationController");

router.post("/send-invitation", sendInvitationEmail);

module.exports = router; 