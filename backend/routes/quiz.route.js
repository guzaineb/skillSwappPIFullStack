const express = require("express");
const twilio = require('twilio');
const { sendQuizNotification } = require('../services/twilio.service');
const {
  getAllQuizzes,
  getAllStudentQuizzes,
  getQuiz,
  createQuiz,
  addQuizAnswer,
  fetchDefinition,
} = require("../controllers/quiz.controller");
const axios = require('axios');

const quotes = [
  { content: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
  { content: "Whether you think you can or you think you can’t, you’re right.", author: "Henry Ford" },
  { content: "I have not failed. I’ve just found 10,000 ways that won’t work.", author: "Thomas Edison" },
];


//new
// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const router = express.Router(); // Créer un routeur

router.get("/", getAllQuizzes);
router.get("/student/:email", getAllStudentQuizzes);
router.get("/:id", getQuiz);

router.get('/test-sms', async (req, res) => {
  try {
    console.log("➡️ Attempting to send SMS...");
    console.log("Using Twilio Number:", process.env.TWILIO_PHONE_NUMBER);
    
    const message = await client.messages.create({
      body: 'Test SMS from Node.js',
      from: process.env.TWILIO_PHONE_NUMBER,
      to: '+21652150980' // Ensure this is verified in Twilio console
    });

    console.log("✅ SMS sent successfully. SID:", message.sid);
    res.json({ 
      success: true,
      sid: message.sid,
      message: "SMS sent successfully"
    });
  } catch (error) {
    console.error('❌ FULL Twilio Error:', {
      code: error.code,
      message: error.message,
      stack: error.stack,
      twilioDetails: error.more_info
    });
    
    res.status(500).json({
      error: "Failed to send SMS",
      twilioCode: error.code,
      details: error.message
    });
  }
});

router.get('/test-twilio-config', (req, res) => {
  const config = {
    accountSid: process.env.TWILIO_ACCOUNT_SID ? '✔️ Present' : '❌ Missing',
    authToken: process.env.TWILIO_AUTH_TOKEN ? '✔️ Present' : '❌ Missing',
    phoneNumber: process.env.TWILIO_PHONE_NUMBER ? '✔️ Present' : '❌ Missing',
    expectedNumber: '+21652150980'
  };
  
  console.log("Twilio Config Check:", config);
  res.json(config);
});

//end
router.post("/", createQuiz);
//router.delete("/:id", deleteQuiz);
router.post("/:id/answers", addQuizAnswer);

router.get('/define/:term', async (req, res) => {
  try {
    const definitions = await fetchDefinition(req.params.term);
    res.json(definitions);
  } catch (error) {
    console.error("❌ Error in fetchDefinition:", error.message);
    res.status(500).json({ error: "Definition unavailable", details: error.message });
  }
});

// Add this test route to quiz.route.js temporarily
router.get('/test-mw-api', async (req, res) => {
  try {
    const testWord = "photosynthesis";
    const apiKey = "f6715eb6-7ecb-42e6-92b7-bad84cbc6750"; // Hardcoded API key
    const response = await axios.get(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${testWord}?key=${apiKey}`
    );
    console.log("API Response:", response.data);
    res.json({
      status: "success",
      data: response.data,
      config: {
        url: response.config.url,
        headers: response.config.headers
      }
    });
  } catch (error) {
    console.error("Full API Error:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack
    });
    res.status(500).json({
      error: "API Test Failed",
      details: error.message,
      response: error.response?.data
    });
  }
});

router.get('/random-quote', (req, res) => {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  res.json(random);
});

router.get('/quote/zen', async (req, res) => {
  try {
    const zenResponse = await axios.get('https://zenquotes.io/api/random');
    const { q: content, a: author } = zenResponse.data[0];
    res.json({ content, author });
  } catch (error) {
    console.error("ZenQuotes Error:", error.message);
    res.status(500).json({ error: "ZenQuotes API failed" });
  }
});


module.exports = router;