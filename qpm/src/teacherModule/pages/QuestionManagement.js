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
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const API_URL = "http://localhost:3001/api/v1/questions";

const QuestionManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [marks, setMarks] = useState("");
  const [module, setModule] = useState("");
  const [course, setCourse] = useState("");
  const [difficulty, setDifficulty] = useState("");

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

  const handleAssignMarks = () => {
    if (!marks || !module || !course || !difficulty || selectedQuestions.length === 0) {
      alert("Please fill all fields and select at least one question!");
      return;
    }

    axios
      .post(`${API_URL}`, {
        questionIds: selectedQuestions,
        marks,
        module,
        course,
        difficulty,
      })
      .then((response) => {
        setQuestions(response.data);
        setSelectedQuestions([]);
        setMarks("");
        setModule("");
        setCourse("");
        setDifficulty("");
      })
      .catch((error) => console.error("Error updating questions:", error));
  };

  const handleDeleteQuestion = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id)))
      .catch((error) => console.error("Error deleting question:", error));
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "40px" }}>
      <Paper elevation={6} sx={{ padding: "30px", borderRadius: "12px", textAlign: "center" }}>
        <Typography variant="h6" sx={{ marginTop: "30px", color: "#1976d2" }}>
          Assign Marks & Details
        </Typography>
        
        <TextField fullWidth label="Marks" type="number" value={marks} onChange={(e) => setMarks(e.target.value)} margin="normal" />
        <TextField fullWidth label="Module" value={module} onChange={(e) => setModule(e.target.value)} margin="normal" />
        <TextField fullWidth label="Course" value={course} onChange={(e) => setCourse(e.target.value)} margin="normal" />
        <TextField fullWidth label="Difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} margin="normal" />

        <Button variant="contained" color="primary" fullWidth onClick={handleAssignMarks} sx={{ marginTop: "20px", borderRadius: "6px" }}>
          Assign Marks
        </Button>

        <Typography variant="h4" gutterBottom sx={{ color: "#1976d2", marginTop: "30px" }}>
          Question Management
        </Typography>

        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Select</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Question</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Marks</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Module</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Course</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Difficulty</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.map((q) => (
                <TableRow key={q.id}>
                  <TableCell>
                    <Checkbox checked={selectedQuestions.includes(q.id)} onChange={() => handleSelectQuestion(q.id)} color="primary" />
                  </TableCell>
                  <TableCell>{q.text}</TableCell>
                  <TableCell>{q.marks}</TableCell>
                  <TableCell>{q.module}</TableCell>
                  <TableCell>{q.course}</TableCell>
                  <TableCell>{q.difficulty}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteQuestion(q.id)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default QuestionManagement;
