const Quiz = require("../models/quiz.model");
const { sendQuizNotification } = require("../services/twilio.service");
const User = require("../models/user.model");

const axios = require("axios");

const fetchDefinition = async (term) => {
  const apiKey = "f6715eb6-7ecb-42e6-92b7-bad84cbc6750"; 

  try {
    const response = await axios.get(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${encodeURIComponent(term)}?key=${apiKey}`,
      {
        timeout: 5000 // 5 second timeout
      }
    );

    // Handle different response formats
    if (!response.data || response.data.length === 0) {
      return ["No definition found"];
    }

    // If the API returns suggestions (misspelled word)
    if (typeof response.data[0] === 'string') {
      return [`Did you mean: ${response.data.join(', ')}`];
    }

    // Extract definitions
    const defs = response.data[0]?.shortdef || [];
    return Array.isArray(defs) ? defs : ["No definition available"];
    
  } catch (error) {
    console.error("Dictionary API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw new Error("Failed to fetch definition");
  }
};

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes" });
  }
};

getAllStudentQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      attempts: { $elemMatch: { userEmail: req.params.email } },
    });
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes" });
  }
};

const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz" });
  }
};

const createQuiz = async (req, res) => {
  const { creatorEmail, title, questions } = req.body;
  
  try {
    // 1. Create the quiz
    const newQuiz = new Quiz({
      creatorEmail,
      title,
      questions,
    });
    await newQuiz.save();

    // 2. Send notification (completely hardcoded)
    try {
      await sendQuizNotification(); // No parameters needed now
      console.log("📨 SMS notification sent successfully");
    } catch (error) {
      console.error("⚠️ SMS notification failed:", error.message);
      // Continue even if SMS fails
    }

    res.status(201).json(newQuiz);
    
  } catch (error) {
    console.error("❌ Quiz creation error:", error);
    res.status(500).json({ 
      message: "Error creating quiz",
      error: error.message 
    });
  }
};

const addQuizAnswer = async (req, res) => {
  const { userEmail, answers } = req.body;
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    quiz.attempts.push({ userEmail, answers });
    await quiz.save();
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Error adding quiz answer" });
  }
};

module.exports = {
  getAllQuizzes,
  getAllStudentQuizzes,
  getQuiz,
  createQuiz,
  addQuizAnswer,
  fetchDefinition
};
