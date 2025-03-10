import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";

const ManagementModule = () => {
  const [patterns, setPatterns] = useState([]);
  const [patternName, setPatternName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [sections, setSections] = useState([]);
  const [sectionTitle, setSectionTitle] = useState("");
  const [marks, setMarks] = useState("");
  const [module, setModule] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/v1/patterns").then((res) => setPatterns(res.data));
  }, []);

  const handleAddSection = () => {
    if (!sectionTitle || !marks || !module) {
      alert("Please fill all fields!");
      return;
    }
    setSections([...sections, { id: Date.now(), title: sectionTitle, marks, module }]);
    setSectionTitle("");
    setMarks("");
    setModule("");
  };

  const handleDeleteSection = (id) => {
    setSections(sections.filter((s) => s.id !== id));
  };

  const handleSavePattern = () => {
    if (!patternName || !subjectCode || sections.length === 0) {
      alert("Enter pattern name, subject code and add at least one section!");
      return;
    }
    const newPattern = { patternName, subjectCode, sections };
    axios.post("http://localhost:3001/api/v1/patterns", newPattern).then((res) => {
      setPatterns([...patterns, res.data]);
      setPatternName("");
      setSubjectCode("");
      setSections([]);
    });
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "40px" }}>
      <Paper elevation={6} sx={{ padding: "30px", borderRadius: "12px", textAlign: "center" }}>
        <Typography variant="h4" sx={{ color: "#1976d2" }}>Manage Question Paper Patterns</Typography>

        <TextField fullWidth label="Pattern Name" value={patternName} onChange={(e) => setPatternName(e.target.value)} margin="normal" />
        <TextField fullWidth label="Subject Code" value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)} margin="normal" />

        <Typography variant="h6" sx={{ marginTop: "20px" }}>Add Sections</Typography>
        <TextField fullWidth label="Section Title" value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} margin="normal" />
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

        <Button variant="contained" color="primary" fullWidth onClick={handleAddSection} sx={{ marginTop: "20px" }}>Add Section</Button>

        {sections.length > 0 && (
          <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976d2", color: "white" }}>
                  <TableCell sx={{ color: "white" }}>Section</TableCell>
                  <TableCell sx={{ color: "white" }}>Marks</TableCell>
                  <TableCell sx={{ color: "white" }}>Module</TableCell>
                  <TableCell sx={{ color: "white" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sections.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.title}</TableCell>
                    <TableCell>{s.marks}</TableCell>
                    <TableCell>{s.module}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteSection(s.id)} color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Button variant="contained" color="success" fullWidth onClick={handleSavePattern} sx={{ marginTop: "20px" }}>Save Pattern</Button>
      </Paper>
    </Container>
  );
};

export default ManagementModule;