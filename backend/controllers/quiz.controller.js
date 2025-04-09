const Quiz = require("../models/quiz.model");

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
    const newQuiz = new Quiz({
      creatorEmail,
      title,
      questions,
    });
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ message: "Error creating quiz", err: JSON.stringify(error)  });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz" });
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
  deleteQuiz,
  addQuizAnswer,
};
