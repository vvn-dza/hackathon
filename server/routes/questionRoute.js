const express = require("express");
const { getQuestions, addQuestion, deleteQuestion } = require("../controllers/questionController");

const router = express.Router();

router.get("/", getQuestions);
router.post("/", addQuestion);
router.delete("/:id", deleteQuestion);

module.exports = router;
