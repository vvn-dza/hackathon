import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadSyllabus } from "../services/api";

const SyllabusUpload = () => {
  const [courseCode, setCourseCode] = useState(""); // Course code state
  const [file, setFile] = useState(null); // Uploaded file state
  const [message, setMessage] = useState({ open: false, text: "", severity: "success" });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseCode || !file) {
      setMessage({ open: true, text: "Please fill the course code and select a file!", severity: "error" });
      return;
    }

    try {
      const response = await uploadSyllabus(courseCode, file);
      console.log("Uploaded Syllabus:", response.data);

      setMessage({ open: true, text: "Syllabus uploaded successfully!", severity: "success" });

      // Reset form fields
      setCourseCode("");
      setFile(null);
    } catch (error) {
      console.error("Upload Error:", error);
      setMessage({ open: true, text: "Failed to upload syllabus!", severity: "error" });
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Upload Syllabus
      </Typography>

      {/* Snackbar for messages */}
      <Snackbar
        open={message.open}
        autoHideDuration={3000}
        onClose={() => setMessage({ ...message, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setMessage({ ...message, open: false })} severity={message.severity} sx={{ width: "100%" }}>
          {message.text}
        </Alert>
      </Snackbar>

      {/* Course Code Field */}
      <TextField
        label="Course Code"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
        fullWidth
        margin="normal"
        required
        sx={{ mt: 3 }}
      />

      {/* File Upload Field */}
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        fullWidth
        sx={{ mt: 3, py: 1.5 }}
      >
        Upload File
        <input type="file" hidden onChange={handleFileChange} />
      </Button>

      {/* Display Uploaded File Name */}
      {file && (
        <Typography sx={{ mt: 2, fontSize: "14px", color: "gray" }}>
          Selected File: {file.name}
        </Typography>
      )}

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 3, py: 1.5 }}
      >
        Upload Syllabus
      </Button>
    </Box>
  );
};

export default SyllabusUpload;
