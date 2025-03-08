import React, { useState } from "react";
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

const ManagementModule = () => {
  const [patterns, setPatterns] = useState([]);
  const [patternName, setPatternName] = useState("");
  const [sections, setSections] = useState([]);
  const [sectionTitle, setSectionTitle] = useState("");
  const [marks, setMarks] = useState("");
  const [module, setModule] = useState("");

  // Add New Section
  const handleAddSection = () => {
    if (!sectionTitle || !marks || !module) {
      alert("Please fill all fields!");
      return;
    }

    setSections([
      ...sections,
      { id: Date.now(), title: sectionTitle, marks, module },
    ]);

    setSectionTitle("");
    setMarks("");
    setModule("");
  };

  // Remove Section
  const handleDeleteSection = (id) => {
    setSections(sections.filter((s) => s.id !== id));
  };

  // Save Question Paper Pattern
  const handleSavePattern = () => {
    if (!patternName || sections.length === 0) {
      alert("Enter a pattern name and add at least one section!");
      return;
    }

    const newPattern = { id: Date.now(), name: patternName, sections };
    setPatterns([...patterns, newPattern]);

    setPatternName("");
    setSections([]);
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
        <Typography variant="h4" sx={{ color: "#1976d2" }}>
          Manage Question Paper Patterns
        </Typography>

        {/* Pattern Name Input */}
        <TextField
          fullWidth
          label="Enter Pattern Name"
          value={patternName}
          onChange={(e) => setPatternName(e.target.value)}
          margin="normal"
        />

        {/* Section Input */}
        <Typography variant="h6" sx={{ marginTop: "20px" }}>
          Add Sections
        </Typography>
        <TextField
          fullWidth
          label="Section Title (e.g., Section A, Part 1)"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
          margin="normal"
        />

        {/* Marks Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Marks</InputLabel>
          <Select value={marks} onChange={(e) => setMarks(e.target.value)}>
            <MenuItem value="2">2 Marks</MenuItem>
            <MenuItem value="8">8 Marks</MenuItem>
            <MenuItem value="10">10 Marks</MenuItem>
          </Select>
        </FormControl>

        {/* Module Dropdown */}
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

        {/* Add Section Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddSection}
          sx={{ marginTop: "20px" }}
        >
          Add Section
        </Button>

        {/* Section Table */}
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
                      <IconButton
                        onClick={() => handleDeleteSection(s.id)}
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
        )}

        {/* Save Pattern Button */}
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={handleSavePattern}
          sx={{ marginTop: "20px", borderRadius: "6px", padding: "10px" }}
        >
          Save Pattern
        </Button>
      </Paper>

      {/* Saved Patterns List */}
      {patterns.length > 0 && (
        <Paper
          elevation={6}
          sx={{
            padding: "20px",
            marginTop: "30px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" sx={{ color: "#1976d2" }}>
            Saved Patterns
          </Typography>
          <TableContainer sx={{ marginTop: "10px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Pattern Name</TableCell>
                  <TableCell>Sections</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patterns.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>
                      {p.sections.map((s) => (
                        <Typography key={s.id}>
                          {s.title} ({s.marks} Marks, {s.module})
                        </Typography>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
};

export default ManagementModule;
