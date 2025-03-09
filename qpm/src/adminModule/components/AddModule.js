import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const AddModule = ({ onAddModule }) => {
  const [subjectCode, setSubjectCode] = useState(""); // State for subject code
  const [moduleName, setModuleName] = useState(""); // State for module name

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subjectCode || !moduleName) {
      alert("Please fill all fields!");
      return;
    }
    // Call the onAddModule function with the module data
    onAddModule({ subjectCode, module: moduleName });
    // Reset form fields
    setSubjectCode("");
    setModuleName("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add New Module
      </Typography>

      {/* Subject Code Field */}
      <TextField
        label="Subject Code"
        value={subjectCode}
        onChange={(e) => setSubjectCode(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      {/* Module Name Field */}
      <TextField
        label="Module Name"
        value={moduleName}
        onChange={(e) => setModuleName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Add Module
      </Button>
    </Box>
  );
};

export default AddModule;