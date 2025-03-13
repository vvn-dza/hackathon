import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Typography,
  TextField,
  Paper,
  Box,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const QuestionPaperGenerator = () => {
  const [courseCode, setCourseCode] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [examDate, setExamDate] = useState(dayjs());
  const [partA, setPartA] = useState([]);
  const [partB, setPartB] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

  const generatePaper = async () => {
    if (!courseCode || !totalMarks || !examDate) {
      setAlert({ open: true, message: "Please fill in all fields.", severity: "error" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/v1/questions/generate-paper", {
        courseCode,
        totalMarks: parseInt(totalMarks),
      });

      const sortedQuestions = response.data.questions.sort((a, b) => a.marks - b.marks);

      const partAQuestions = sortedQuestions.filter(q => q.marks === 2).slice(0, 10);
      const partBQuestions = sortedQuestions.filter(q => q.marks !== 2);

      setPartA(partAQuestions);
      setPartB(partBQuestions);

      setAlert({ open: true, message: "Question paper generated successfully.", severity: "success" });
    } catch (error) {
      setAlert({
        open: true,
        message: error.response?.data?.message || "Error generating question paper",
        severity: "error",
      });
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFont("times", "bold");
    doc.setFontSize(18);
    doc.text("SJEC Institute of Technology", 105, 20, { align: "center" });
    doc.setFontSize(14);
    doc.text("Department of Computer Applications", 105, 30, { align: "center" });
    doc.setFontSize(16);
    doc.text("QUESTION PAPER", 105, 40, { align: "center" });

    // Course Details
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.text(`Course Code: ${courseCode}`, 20, 50);
    doc.text(`Exam Date: ${examDate.format("DD-MM-YYYY")}`, 20, 60);
    doc.text(`Total Marks: ${totalMarks}`, 20, 70);

    let y = 80;

    // Part A
    if (partA.length > 0) {
      doc.setFontSize(14);
      doc.setFont("times", "bold");
      doc.text("Part A (2 Marks Each)", 20, y);
      y += 10;
      doc.setFontSize(12);
      doc.setFont("times", "normal");

      partA.forEach((q, index) => {
        doc.text(`${index + 1}. ${q.text} (${q.marks} marks)`, 20, y);
        y += 10;
      });
    }

    // Part B
    if (partB.length > 0) {
      y += 10;
      doc.setFontSize(14);
      doc.setFont("times", "bold");
      doc.text("Part B", 20, y);
      y += 10;
      doc.setFontSize(12);
      doc.setFont("times", "normal");

      partB.forEach((q, index) => {
        doc.text(`${index + 1}. ${q.text} (${q.marks} marks)`, 20, y);
        y += 10;
      });
    }

    doc.save("Question_Paper.pdf");
  };

  return (
    <Container>
      <Box sx={{ paddingTop: 4 }}>
        <Card elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>Question Paper Generator</Typography>

            <TextField
              label="Course Code"
              fullWidth
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              sx={{ marginBottom: 2 }}
            />

            <TextField
              label="Total Marks"
              type="number"
              fullWidth
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
              sx={{ marginBottom: 2 }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Exam Date"
                value={examDate}
                onChange={(newDate) => setExamDate(newDate)}
                sx={{ width: "100%", marginBottom: 2 }}
              />
            </LocalizationProvider>

            <Button variant="contained" color="primary" onClick={generatePaper} sx={{ marginRight: 2 }}>
              Generate Question Paper
            </Button>

            {(partA.length > 0 || partB.length > 0) && (
              <Button variant="contained" color="secondary" onClick={generatePDF}>
                Download PDF
              </Button>
            )}
          </CardContent>
        </Card>
      </Box>

      {(partA.length > 0 || partB.length > 0) && (
        <Paper sx={{ padding: 3, marginTop: 4, borderRadius: 2 }}>
          <Typography variant="h5">Generated Question Paper</Typography>
          <Typography variant="subtitle1">Course Code: {courseCode}</Typography>
          <Typography variant="subtitle1">Exam Date: {examDate.format("DD-MM-YYYY")}</Typography>

          {partA.length > 0 && (
            <>
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="h6">Part A (2 Marks Each)</Typography>
              {partA.map((q, index) => (
                <Typography key={q._id}>{index + 1}. {q.text} ({q.marks} marks)</Typography>
              ))}
            </>
          )}

          {partB.length > 0 && (
            <>
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="h6">Part B</Typography>
              {partB.map((q, index) => (
                <Typography key={q._id}>{index + 1}. {q.text} ({q.marks} marks)</Typography>
              ))}
            </>
          )}
        </Paper>
      )}
    </Container>
  );
};

export default QuestionPaperGenerator;
