const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  creatorEmail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  questions: {
    type: [
      {
        question: String,
        options: [String],
        answer: String,
      },
    ],
    required: true,
  },
  attempts: {
    type: [{ userEmail: String, answers: [String] }],
    required: true,
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
