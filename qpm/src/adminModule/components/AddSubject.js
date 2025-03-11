import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import axios from "axios";

const AddSubject = () => {
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [sem, setSem] = useState("");
  const [type, setType] = useState("theory");
  const [specialization, setSpecialization] = useState("");
  const [modules, setModules] = useState([""]);

  const handleAddModule = () => {
    setModules([...modules, ""]);
  };

  const handleRemoveModule = (index) => {
    const updatedModules = modules.filter((_, i) => i !== index);
    setModules(updatedModules);
  };

  const handleModuleChange = (index, value) => {
    const updatedModules = [...modules];
    updatedModules[index] = value;
    setModules(updatedModules);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subjectName || !subjectCode || !department || !year || !sem || !type) {
      alert("Please fill all required fields!");
      return;
    }
    const subjectData = {
      name: subjectName,
      code: subjectCode,
      department,
      year,
      sem,
      type,
      specialization: specialization || null, // Optional field
      modules: modules.filter((module) => module.trim() !== ""), // Remove empty modules
    };

    try {
      console.log("Sending data:", JSON.stringify(subjectData, null, 2));
      const response = await axios.post("http:///localhost:3001/api/v1/subjects", subjectData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response:", response.data);
      // Reset form fields
      setSubjectName("");
      setSubjectCode("");
      setDepartment("");
      setYear("");
      setSem("");
      setType("theory");
      setSpecialization("");
      setModules([""]);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add New Subject
      </Typography>

      {/* Subject Name */}
      <TextField
        label="Subject Name"
        value={subjectName}
        onChange={(e) => setSubjectName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      {/* Subject Code */}
      <TextField
        label="Subject Code"
        value={subjectCode}
        onChange={(e) => setSubjectCode(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      {/* Department */}
      <TextField
        label="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      {/* Year */}
      <TextField
        label="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      {/* Semester */}
      <TextField
        label="Semester"
        value={sem}
        onChange={(e) => setSem(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      {/* Type of Subject */}
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value="theory">Theory</MenuItem>
          <MenuItem value="laboratory">Laboratory</MenuItem>
        </Select>
      </FormControl>

      {/* Specialization */}
      <TextField
        label="Specialization"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Modules Section */}
      <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
        Modules
      </Typography>
      {modules.map((module, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <TextField
            label={`Module ${index + 1}`}
            value={module}
            onChange={(e) => handleModuleChange(index, e.target.value)}
            fullWidth
          />
          {modules.length > 1 && (
            <IconButton onClick={() => handleRemoveModule(index)} color="error">
              <RemoveCircleOutlineIcon />
            </IconButton>
          )}
          {index === modules.length - 1 && (
            <IconButton onClick={handleAddModule} color="primary">
              <AddCircleOutlineIcon />
            </IconButton>
          )}
        </Box>
      ))}

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Add Subject
      </Button>
    </Box>
  );
};

export default AddSubject;
