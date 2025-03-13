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
  Snackbar,
  Alert,
  Card,
  CardContent,
  Grid,
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
  const [message, setMessage] = useState({ open: false, text: "", severity: "success" });

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
      setMessage({ open: true, text: "Please fill all required fields!", severity: "error" });
      return;
    }
    const subjectData = {
      name: subjectName,
      code: subjectCode,
      department,
      year,
      sem,
      type,
      specialization: specialization || null,
      modules: modules.filter((module) => module.trim() !== ""),
    };

    try {
      const response = await axios.post("http://localhost:3001/api/v1/subjects", subjectData);
      setMessage({ open: true, text: "Subject added successfully!", severity: "success" });

      setSubjectName("");
      setSubjectCode("");
      setDepartment("");
      setYear("");
      setSem("");
      setType("theory");
      setSpecialization("");
      setModules([""]);
    } catch (error) {
      setMessage({ open: true, text: "Failed to add subject!", severity: "error" });
    }
  };

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", my: 3, p: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Add New Subject
        </Typography>

        {/* Snackbar for Messages */}
        <Snackbar
          open={message.open}
          autoHideDuration={3000}
          onClose={() => setMessage({ ...message, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={message.severity} sx={{ width: "100%" }}>
            {message.text}
          </Alert>
        </Snackbar>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Subject Name" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} fullWidth required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Subject Code" value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)} fullWidth required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} fullWidth required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Year" value={year} onChange={(e) => setYear(e.target.value)} fullWidth required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Semester" value={sem} onChange={(e) => setSem(e.target.value)} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                  <MenuItem value="theory">Theory</MenuItem>
                  <MenuItem value="laboratory">Laboratory</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Specialization (Optional)" value={specialization} onChange={(e) => setSpecialization(e.target.value)} fullWidth />
            </Grid>

            {/* Modules Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Modules
              </Typography>
              {modules.map((module, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <TextField label={`Module ${index + 1}`} value={module} onChange={(e) => handleModuleChange(index, e.target.value)} fullWidth />
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
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, px: 4, fontSize: 16 }}>
                Add Subject
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AddSubject;
