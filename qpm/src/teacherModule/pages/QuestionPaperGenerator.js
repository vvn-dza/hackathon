import React, { useState } from "react";
import { Container, Button, Typography, Paper, MenuItem, Select, TextField } from "@mui/material";
import jsPDF from "jspdf";
import axios from "axios";

const QuestionPaperGenerator = () => {
  const [patterns, setPatterns] = useState([]);
  const [selectedPattern, setSelectedPattern] = useState("");
  const [date, setDate] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [generatedQuestions, setGeneratedQuestions] = useState([]);

  // Fetch available patterns from the backend
  const fetchPatterns = async () => {
    try {
      const res = await axios.get("/api/patterns");
      setPatterns(res.data);
    } catch (error) {
      console.error("Error fetching patterns", error);
    }
  };

  // Generate Question Paper
  const generateQuestionPaper = async () => {
    if (!selectedPattern || !date || !subjectCode) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("/api/questions/generate", {
        patternId: selectedPattern,
        date,
        subjectCode,
      });

      setGeneratedQuestions(res.data.questions);
    } catch (error) {
      console.error("Error generating question paper", error);
    }
  };

  // Generate PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Question Paper", 20, 20);
    doc.setFontSize(12);
    doc.text(`Subject Code: ${subjectCode}`, 20, 30);
    doc.text(`Date: ${date}`, 20, 40);

    let y = 60;
    generatedQuestions.forEach((section, index) => {
      doc.setFontSize(14);
      doc.text(`${index + 1}. ${section.sectionName}`, 20, y);
      y += 10;

      section.questions.forEach((q, qIndex) => {
        doc.setFontSize(12);
        doc.text(`${qIndex + 1}. ${q.text} (${q.marks} Marks)`, 25, y);
        y += 10;
      });
      y += 5;
    });

    doc.save("Question_Paper.pdf");
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "40px" }}>
      <Paper elevation={6} sx={{ padding: "30px", borderRadius: "12px", textAlign: "center" }}>
        <Typography variant="h5" sx={{ marginBottom: "20px", color: "#1976d2" }}>
          Generate Question Paper
        </Typography>

        {/* Pattern Selection */}
        <Select
          fullWidth
          value={selectedPattern}
          onChange={(e) => setSelectedPattern(e.target.value)}
          displayEmpty
          sx={{ marginBottom: "20px" }}
        >
          <MenuItem value="" disabled>Select Pattern</MenuItem>
          {patterns.map((pattern) => (
            <MenuItem key={pattern._id} value={pattern._id}>
              {pattern.name}
            </MenuItem>
          ))}
        </Select>

        {/* Date Input */}
        <TextField
          fullWidth
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />

        {/* Subject Code */}
        <TextField
          fullWidth
          label="Subject Code"
          value={subjectCode}
          onChange={(e) => setSubjectCode(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />

        <Button variant="contained" color="primary" fullWidth onClick={generateQuestionPaper} sx={{ marginBottom: "20px" }}>
          Generate Question Paper
        </Button>

        {generatedQuestions.length > 0 && (
          <>
            <Typography variant="h6" sx={{ marginTop: "20px" }}>Generated Questions</Typography>
            {generatedQuestions.map((section, index) => (
              <div key={index} style={{ textAlign: "left", marginTop: "10px" }}>
                <Typography variant="subtitle1">{index + 1}. {section.sectionName}</Typography>
                <ul>
                  {section.questions.map((q, qIndex) => (
                    <li key={qIndex}>{q.text} ({q.marks} Marks)</li>
                  ))}
                </ul>
              </div>
            ))}
            <Button variant="contained" color="secondary" fullWidth onClick={downloadPDF} sx={{ marginTop: "20px" }}>
              Download PDF
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default QuestionPaperGenerator;
