const express = require("express");
const {
  getAllQuizzes,
  getAllStudentQuizzes,
  getQuiz,
  createQuiz,
  deleteQuiz,
  addQuizAnswer,
} = require("../controllers/quiz.controller");

const router = express.Router(); // Créer un routeur

router.get("/", getAllQuizzes);
router.get("/student/:email", getAllStudentQuizzes);
router.get("/:id", getQuiz);
router.post("/", createQuiz);
router.delete("/:id", deleteQuiz);
router.post("/:id/answers", addQuizAnswer);

module.exports = router;
