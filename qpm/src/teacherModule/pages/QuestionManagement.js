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
  Snackbar,
  Alert,
} from "@mui/material";
import { Delete, Close } from "@mui/icons-material";

const API_URL = "http://localhost:3001/api/v1/questions";

const QuestionManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
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
      setSnackbarMessage("⚠️ Please fill in all fields before submitting.");
      setSnackbarOpen(true);
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
        setSnackbarMessage("Question added successfully!");
        setSnackbarOpen(true);
      })
      .catch((error) => console.error("Error adding question:", error));
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "40px" }}>
      <Paper elevation={6} sx={{ padding: "30px", borderRadius: "12px", textAlign: "center" }}>
      <Typography
      variant="h5"
      sx={{
        mt: 3, // Equivalent to marginTop: "30px"
        color: "#1a1a1a",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 1,
        textShadow: "1px 1px 5px rgba(255, 255, 255, 0.2)",
  }}
>
  Add New Question
</Typography>


        <TextField fullWidth label="Question Text" value={newQuestion.text} onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })} margin="normal" />
        <TextField fullWidth label="Marks" type="number" value={newQuestion.marks} onChange={(e) => setNewQuestion({ ...newQuestion, marks: e.target.value })} select margin="normal">
          <MenuItem value="2">2 Marks</MenuItem>
          <MenuItem value="8">8 Marks</MenuItem>
          <MenuItem value="10">10 Marks</MenuItem>
        </TextField>

        <TextField fullWidth label="Module" value={newQuestion.module} onChange={(e) => setNewQuestion({ ...newQuestion, module: e.target.value })} select margin="normal">
          <MenuItem value="Mod1">Module 1</MenuItem>
          <MenuItem value="Mod2">Module 2</MenuItem>
          <MenuItem value="Mod3">Module 3</MenuItem>
          <MenuItem value="Mod4">Module 4</MenuItem>
          <MenuItem value="Mod5">Module 5</MenuItem>
        </TextField>
        <TextField fullWidth label="Course Code" value={newQuestion.courseCode} onChange={(e) => setNewQuestion({ ...newQuestion, courseCode: e.target.value })} margin="normal" />
        <TextField
          fullWidth
          label="Difficulty"
          value={newQuestion.difficulty}
          onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
          select
          margin="normal"
        >
          <MenuItem value="Easy">Easy | L1</MenuItem>
          <MenuItem value="Medium">Medium | L2</MenuItem>
          <MenuItem value="Hard">Hard | L3</MenuItem>
        </TextField>

        <Button variant="contained" color="secondary" fullWidth onClick={handleAddQuestion} sx={{ marginTop: "20px", borderRadius: "6px" }}>
          Add Question
        </Button>
      </Paper>

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
      <Alert onClose={handleCloseSnackbar} severity={snackbarMessage ? "warning" : "success"} sx={{ width: "100%" }}>
  {snackbarMessage}
</Alert>
      </Snackbar>
    </Container>
  );
};

export default QuestionManagement;