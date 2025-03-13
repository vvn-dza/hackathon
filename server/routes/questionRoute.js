const express = require("express");
const { getQuestions, addQuestion, deleteQuestion, generateQuestionPaper } = require("../controllers/questionController");

const router = express.Router();

router.get("/", getQuestions);
router.post("/", addQuestion);
router.delete("/:id", deleteQuestion);
router.post("/generate-paper", generateQuestionPaper);

module.exports = router;
