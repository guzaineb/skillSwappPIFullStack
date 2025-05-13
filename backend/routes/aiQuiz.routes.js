const express = require('express');
const controller = require('../controllers/aiQuiz.controller');
const router = express.Router();

router.post('/generate', controller.generateQuiz);

module.exports = router;