import React, { useState, useEffect } from "react";
import { 
  Container, 
  Button, 
  Typography, 
  Paper, 
  MenuItem, 
  Select, 
  TextField,
  Box,
  FormControl,
  InputLabel
} from "@mui/material";
import jsPDF from "jspdf";
import axios from "axios";

const QuestionPaperGenerator = () => {
  const [patterns, setPatterns] = useState([]);
  const [selectedPattern, setSelectedPattern] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);

  useEffect(() => {
    fetchPatterns();
  }, []);

  const fetchPatterns = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/patterns/");
      console.log(response.data);
      setPatterns(response.data);
    } catch (error) {
      console.error("Error fetching patterns:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post("/api/generate-questions", {
        patternId: selectedPattern,
        courseCode,
        date
      });
      
      setGeneratedQuestions(response.data.questions);
      generatePDF(response.data.questions);
    } catch (error) {
      console.error("Error generating questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = (questions) => {
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(16);
    doc.text(`Course Code: ${courseCode}`, 20, 20);
    doc.text(`Date: ${date}`, 20, 30);
    
    // Add questions
    doc.setFontSize(12);
    let yPosition = 50;
    
    questions.forEach((question, index) => {
      doc.text(`${index + 1}. ${question.text}`, 20, yPosition);
      yPosition += 10;
      if (question.subQuestions) {
        question.subQuestions.forEach((subQ, subIndex) => {
          doc.text(`   ${String.fromCharCode(97 + subIndex)}) ${subQ}`, 30, yPosition);
          yPosition += 10;
        });
      }
    });
    
    doc.save(`${courseCode}-question-paper.pdf`);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Generate Question Paper
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Course Code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Question Paper Pattern</InputLabel>
            <Select
              value={selectedPattern}
              onChange={(e) => setSelectedPattern(e.target.value)}
              required
            >
              {patterns.map((pattern) => (
                <MenuItem key={pattern.id} value={pattern.id}>
                  {pattern.patternName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            type="date"
            label="Exam Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 3 }}
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Question Paper"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default QuestionPaperGenerator;