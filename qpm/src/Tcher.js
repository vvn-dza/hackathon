import { useState } from "react";
import { Card, CardContent } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Table, TableRow, TableCell, TableHead, TableBody } from "@mui/material";
import { Tabs, Tab } from "@mui/material";

export default function TeacherModule() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    subject: "",
    module: "",
    type: "2-mark",
    text: "",
  });
  const [tabValue, setTabValue] = useState(0);

  const addQuestion = () => {
    if (newQuestion.text.trim()) {
      setQuestions([...questions, newQuestion]);
      setNewQuestion({ subject: "", module: "", type: "2-mark", text: "" });
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
        <Tab label="Manage Questions" />
        <Tab label="Generate Question Paper" />
        <Tab label="Preview & Export" />
      </Tabs>

      {tabValue === 0 && (
        <Card sx={{ p: 2, mt: 2 }}>
          <CardContent>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              <TextField
                label="Subject"
                value={newQuestion.subject}
                onChange={(e) => setNewQuestion({ ...newQuestion, subject: e.target.value })}
                fullWidth
              />
              <TextField
                label="Module"
                value={newQuestion.module}
                onChange={(e) => setNewQuestion({ ...newQuestion, module: e.target.value })}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={newQuestion.type}
                  onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
                >
                  <MenuItem value="2-mark">2-Mark</MenuItem>
                  <MenuItem value="8-mark">8-Mark</MenuItem>
                  <MenuItem value="10-mark">10-Mark</MenuItem>
                </Select>
              </FormControl>
            </div>
            <TextField
              label="Enter question text"
              multiline
              rows={3}
              fullWidth
              sx={{ mt: 2 }}
              value={newQuestion.text}
              onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
            />
            <Button variant="contained" sx={{ mt: 2 }} onClick={addQuestion}>
              Add Question
            </Button>
          </CardContent>
        </Card>
      )}

      {tabValue === 0 && (
        <Table sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>Module</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Question</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((q, index) => (
              <TableRow key={index}>
                <TableCell>{q.subject}</TableCell>
                <TableCell>{q.module}</TableCell>
                <TableCell>{q.type}</TableCell>
                <TableCell>{q.text}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {tabValue === 1 && (
        <Button variant="contained" sx={{ mt: 4 }}>
          Generate
        </Button>
      )}

      {tabValue === 2 && (
        <Button variant="contained" sx={{ mt: 4 }}>
          Export as PDF
        </Button>
      )}
    </div>
  );
}
