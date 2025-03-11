import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Checkbox,
  TextField,
  MenuItem,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const API_URL = "http://localhost:3001/api/v1/questions";

const QuestionManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    marks: "",
    module: "",
    courseCode: "",
    difficulty: "",
  });

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setQuestions(response.data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleSelectQuestion = (id) => {
    setSelectedQuestions((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((qId) => qId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteQuestion = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id)))
      .catch((error) => console.error("Error deleting question:", error));
  };

  const handleAddQuestion = () => {
    if (!newQuestion.text || !newQuestion.marks || !newQuestion.module || !newQuestion.courseCode || !newQuestion.difficulty) {
      alert("Please fill all fields!");
      return;
    }

    axios
      .post(API_URL, newQuestion)
      .then((response) => {
        setQuestions([...questions, response.data]);
        setNewQuestion({
          text: "",
          marks: "",
          module: "",
          courseCode: "",
          difficulty: "",
        });
      })
      .catch((error) => console.error("Error adding question:", error));
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "40px" }}>
      <Paper elevation={6} sx={{ padding: "30px", borderRadius: "12px", textAlign: "center" }}>
        <Typography variant="h6" sx={{ marginTop: "30px", color: "#1976d2" }}>
          Add New Question
        </Typography>

        <TextField fullWidth label="Question Text" value={newQuestion.text} onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })} margin="normal" />
        <TextField fullWidth label="Marks" type="number" value={newQuestion.marks} onChange={(e) => setNewQuestion({ ...newQuestion, marks: e.target.value })} margin="normal" />
        <TextField fullWidth label="Module" value={newQuestion.module} onChange={(e) => setNewQuestion({ ...newQuestion, module: e.target.value })} margin="normal" />
        <TextField fullWidth label="Course Code" value={newQuestion.courseCode} onChange={(e) => setNewQuestion({ ...newQuestion, courseCode: e.target.value })} margin="normal" />
        <TextField
          fullWidth
          label="Difficulty"
          value={newQuestion.difficulty}
          onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
          select
          margin="normal"
        >
          <MenuItem value="Easy">Easy</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Hard">Hard</MenuItem>
        </TextField>

        <Button variant="contained" color="secondary" fullWidth onClick={handleAddQuestion} sx={{ marginTop: "20px", borderRadius: "6px" }}>
          Add Question
        </Button>

       
      </Paper>
    </Container>
  );
};

export default QuestionManagement;
