
import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadSyllabus } from "../services/api";

const SyllabusUpload = () => {
  const [syllabusFile, setSyllabusFile] = useState(null);

  const handleSyllabusUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const response = await uploadSyllabus(file);
    setSyllabusFile(response.data.filename);
  };

  return (
    <Box>
      <Typography variant="h6">Upload Syllabus</Typography>
      <Button variant="contained" component="label" startIcon={<CloudUploadIcon />} sx={{ mt: 2 }}>
        Upload File
        <input type="file" hidden onChange={handleSyllabusUpload} />
      </Button>
      {syllabusFile && (
        <Typography sx={{ mt: 2 }}>
          Uploaded File: {syllabusFile}
        </Typography>
      )}
    </Box>
  );
};

export default SyllabusUpload;