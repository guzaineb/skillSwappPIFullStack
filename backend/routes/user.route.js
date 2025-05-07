// backend/routes/user.route.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/use.controller'); // Chemin corrigé

router.get('/', userController.getAllUsers);

module.exports = router;