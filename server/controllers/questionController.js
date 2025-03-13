const Question = require("../models/Question");

// Fetch questions with optional filters (course code & marks)
const getQuestions = async (req, res) => {
  try {
    const { courseCode, marks } = req.query;
    let filter = {};

    if (courseCode) filter.courseCode = courseCode;
    if (marks) filter.marks = parseInt(marks);

    const questions = await Question.find(filter);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error });
  }
};

// Add a new question
const addQuestion = async (req, res) => {
  try {
    const { text, marks, module, courseCode, difficulty } = req.body;
    const newQuestion = new Question({ text, marks, module, courseCode, difficulty });
    await newQuestion.save();
    res.status(201).json({ message: "Question added successfully", question: newQuestion });
  } catch (error) {
    res.status(400).json({ message: "Error adding question", error });
  }
};

// Delete a question by ID
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await Question.findByIdAndDelete(id);
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting question", error });
  }
};

// Generate a random question paper based on total marks
const generateQuestionPaper = async (req, res) => {
  const { courseCode, totalMarks } = req.body;

  if (!courseCode || !totalMarks) {
    return res.status(400).json({ message: "Please provide courseCode and totalMarks" });
  }

  try {
    let allQuestions = await Question.find({ courseCode });
    allQuestions = allQuestions.sort(() => 0.5 - Math.random()); // Shuffle the questions

    let selectedQuestions = [];
    let remainingMarks = totalMarks;

    for (const question of allQuestions) {
      if (remainingMarks >= question.marks) {
        selectedQuestions.push(question);
        remainingMarks -= question.marks;
      }
      if (remainingMarks <= 0) break;
    }

    if (selectedQuestions.length === 0) {
      return res.status(404).json({ message: "No suitable questions found" });
    }

    res.status(200).json({ message: "Question Paper Generated", questions: selectedQuestions });
  } catch (error) {
    res.status(500).json({ message: "Error generating question paper", error });
  }
};



module.exports = { getQuestions, addQuestion, deleteQuestion, generateQuestionPaper };
