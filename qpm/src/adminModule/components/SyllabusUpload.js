import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadSyllabus } from "../services/api";

const SyllabusUpload = () => {
  const [courseCode, setCourseCode] = useState(""); // State for course code
  const [file, setFile] = useState(null); // State for uploaded file
  const [uploadStatus, setUploadStatus] = useState(""); // State for upload status

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseCode || !file) {
      alert("Please fill the course code and select a file!");
      return;
    }

    try {
      const response = await uploadSyllabus(courseCode, file);
      setUploadStatus("Syllabus uploaded successfully!");
      console.log("Uploaded Syllabus:", response.data);
      // Reset form fields
      setCourseCode("");
      setFile(null);
    } catch (error) {
      setUploadStatus("Failed to upload syllabus: " + error.message);
      console.error("Upload Error:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Upload Syllabus
      </Typography>

      {/* Course Code Field */}
      <TextField
        label="Course Code"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      {/* File Upload Field */}
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        sx={{ mt: 2 }}
      >
        Upload File
        <input type="file" hidden onChange={handleFileChange} />
      </Button>

      {/* Display Uploaded File Name */}
      {file && (
        <Typography sx={{ mt: 2 }}>
          Selected File: {file.name}
        </Typography>
      )}

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Upload Syllabus
      </Button>

      {/* Upload Status */}
      {uploadStatus && (
        <Typography sx={{ mt: 2, color: uploadStatus.includes("Failed") ? "error.main" : "success.main" }}>
          {uploadStatus}
        </Typography>
      )}
    </Box>
  );
};

export default SyllabusUpload;