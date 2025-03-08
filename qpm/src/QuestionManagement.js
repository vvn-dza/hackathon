import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
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
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const fetchedQuestions = [
  { id: 1, text: "What is React?", marks: 2, module: "Module 1" },
  { id: 2, text: "Explain useState Hook.", marks: 8, module: "Module 2" },
  { id: 3, text: "Describe Redux flow.", marks: 10, module: "Module 3" },
];

const QuestionManagement = () => {
  const [questions, setQuestions] = useState(fetchedQuestions);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [marks, setMarks] = useState("");
  const [module, setModule] = useState("");
  const [co, setCo] = useState("");
  const [po, setPo] = useState("");
  const [bloomLevel, setBloomLevel] = useState("");

  const handleSelectQuestion = (id) => {
    setSelectedQuestions((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((qId) => qId !== id)
        : [...prevSelected, id]
    );
  };

  const handleAssignMarks = () => {
    if (!marks || !module || !co || !po || !bloomLevel || selectedQuestions.length === 0) {
      alert("Please fill all fields and select at least one question!");
      return;
    }

    alert(`Marks assigned to selected questions: ${marks}`);
    setSelectedQuestions([]);
    setMarks("");
    setModule("");
    setCo("");
    setPo("");
    setBloomLevel("");
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "40px" }}>
      <Paper
        elevation={6}
        sx={{
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center",
          backgroundColor: "#f9fafb",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "#1976d2" }}>
          Question Management
        </Typography>

        {/* Question List with Checkboxes */}
        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2", color: "white" }}>
                <TableCell sx={{ color: "white" }}>Select</TableCell>
                <TableCell sx={{ color: "white" }}>Question</TableCell>
                <TableCell sx={{ color: "white" }}>Marks</TableCell>
                <TableCell sx={{ color: "white" }}>Module</TableCell>
                <TableCell sx={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.map((q) => (
                <TableRow key={q.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedQuestions.includes(q.id)}
                      onChange={() => handleSelectQuestion(q.id)}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>{q.text}</TableCell>
                  <TableCell>{q.marks}</TableCell>
                  <TableCell>{q.module}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        setQuestions(questions.filter((item) => item.id !== q.id))
                      }
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Assignment Fields */}
        <Typography variant="h6" sx={{ marginTop: "30px", color: "#1976d2" }}>
          Assign Marks & Details
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Marks</InputLabel>
          <Select value={marks} onChange={(e) => setMarks(e.target.value)}>
            <MenuItem value="2">2 Marks</MenuItem>
            <MenuItem value="8">8 Marks</MenuItem>
            <MenuItem value="10">10 Marks</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Module</InputLabel>
          <Select value={module} onChange={(e) => setModule(e.target.value)}>
            <MenuItem value="Module 1">Module 1</MenuItem>
            <MenuItem value="Module 2">Module 2</MenuItem>
            <MenuItem value="Module 3">Module 3</MenuItem>
            <MenuItem value="Module 4">Module 4</MenuItem>
            <MenuItem value="Module 5">Module 5</MenuItem>
          </Select>
        </FormControl>

        {/* CO, PO, and Bloom Level Dropdowns */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Course Outcome (CO)</InputLabel>
          <Select value={co} onChange={(e) => setCo(e.target.value)}>
            <MenuItem value="CO1">CO1</MenuItem>
            <MenuItem value="CO2">CO2</MenuItem>
            <MenuItem value="CO3">CO3</MenuItem>
            <MenuItem value="CO4">CO4</MenuItem>
            <MenuItem value="CO5">CO5</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Program Outcome (PO)</InputLabel>
          <Select value={po} onChange={(e) => setPo(e.target.value)}>
            <MenuItem value="PO1">PO1</MenuItem>
            <MenuItem value="PO2">PO2</MenuItem>
            <MenuItem value="PO3">PO3</MenuItem>
            <MenuItem value="PO4">PO4</MenuItem>
            <MenuItem value="PO5">PO5</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Bloom's Taxonomy Level</InputLabel>
          <Select value={bloomLevel} onChange={(e) => setBloomLevel(e.target.value)}>
            <MenuItem value="1">Level 1</MenuItem>
            <MenuItem value="2">Level 2</MenuItem>
            <MenuItem value="3">Level 3</MenuItem>
            <MenuItem value="4">Level 4</MenuItem>
            <MenuItem value="5">Level 5</MenuItem>
          </Select>
        </FormControl>

        {/* Assign Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAssignMarks}
          sx={{ marginTop: "20px", borderRadius: "6px", padding: "10px" }}
        >
          Assign Marks
        </Button>
      </Paper>
    </Container>
  );
};

export default QuestionManagement;
