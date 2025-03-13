import React, { useState } from "react";
import {
  Button,
  Container,
  Typography,
  MenuItem,
  Select,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Card,
  CardContent
} from "@mui/material";

const questionBank = [
  { id: 1, module: 1, type: "2-mark", question: "Define recursion." },
  { id: 2, module: 1, type: "10-mark", question: "Explain the concept of polymorphism." },
  { id: 3, module: 2, type: "8-mark", question: "Describe the working of a stack." },
  { id: 4, module: 2, type: "10-mark", question: "Discuss the OSI model layers." },
  { id: 5, module: 3, type: "2-mark", question: "What is an algorithm?" },
];

const QuestionPaperGenerator = () => {
  const [patternType, setPatternType] = useState("50");
  const [modules, setModules] = useState([]);
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [semester, setSemester] = useState("");
  const [questionPaper, setQuestionPaper] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

  const handleModuleChange = (mod) => {
    setModules((prevModules) =>
      prevModules.includes(mod)
        ? prevModules.filter((m) => m !== mod)
        : [...prevModules, mod]
    );
  };

  const generatePaper = () => {
    if (!subject || !date || !semester) {
      setAlert({ open: true, message: "Please fill in all required fields.", severity: "error" });
      return;
    }
    
    const selectedQuestions = [];
    if (patternType === "50") {
      if (modules.length === 0) {
        setAlert({ open: true, message: "Please select at least one module.", severity: "error" });
        return;
      }
      modules.forEach((module) => {
        const filteredQuestions = questionBank.filter(q => q.module === module);
        selectedQuestions.push(...filteredQuestions.slice(0, 5));
      });
    } else {
      const filteredQuestions = questionBank.slice(0, 10);
      selectedQuestions.push(...filteredQuestions);
    }
    
    setQuestionPaper(selectedQuestions);
    setAlert({ open: true, message: "Question paper generated successfully.", severity: "success" });
  };

  return (
    <Container>
      <Box sx={{ paddingTop: 4 }}>
        <Card elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>Question Paper Generator</Typography>
            
            <TextField
              label="Subject/Course Code"
              fullWidth
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            
            <TextField
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Semester</InputLabel>
              <Select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                <MenuItem value="Semester 1">Semester 1</MenuItem>
                <MenuItem value="Semester 2">Semester 2</MenuItem>
                <MenuItem value="Semester 3">Semester 3</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Marks</InputLabel>
              <Select
                value={patternType}
                onChange={(e) => setPatternType(e.target.value)}
              >
                <MenuItem value="50">50 Marks</MenuItem>
                <MenuItem value="100">100 Marks</MenuItem>
              </Select>
            </FormControl>

            {patternType === "50" && (
              <Box p={2} sx={{ border: "1px solid #ccc", borderRadius: 2, marginBottom: 2 }}>
                <Typography variant="subtitle1">Select Modules:</Typography>
                {[1, 2, 3, 4, 5].map((mod) => (
                  <FormControlLabel
                    key={mod}
                    control={
                      <Checkbox
                        checked={modules.includes(mod)}
                        onChange={() => handleModuleChange(mod)}
                      />
                    }
                    label={`Module ${mod}`}
                  />
                ))}
              </Box>
            )}
            
            <Button variant="contained" color="primary" onClick={generatePaper} sx={{ marginTop: 2 }}>Generate Question Paper</Button>
          </CardContent>
        </Card>
      </Box>
      
      {questionPaper.length > 0 && (
        <Paper sx={{ padding: 3, marginTop: 4, borderRadius: 2 }}>
          <Typography variant="h5">Generated Question Paper</Typography>
          <Typography variant="subtitle1">Date: {date} | Semester: {semester}</Typography>
          <Typography variant="subtitle1">Subject: {subject}</Typography>
          {questionPaper.map((q, index) => (
            <Typography key={q.id}>{index + 1}. {q.question}</Typography>
          ))}
        </Paper>
      )}
      
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={() => setAlert({ ...alert, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default QuestionPaperGenerator;
