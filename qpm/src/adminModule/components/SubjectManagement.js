import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  IconButton,
  Snackbar,
  Alert,
  TableContainer,
  Paper,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getSubjects } from "../services/api";

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await getSubjects();
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleDeleteSubject = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/subjects/${id}`);
      setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject._id !== id));

      setSnackbarMessage("Subject deleted successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting subject:", error);
      setSnackbarMessage("Failed to delete subject!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ maxWidth: "95%", mx: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
        Subject Management
      </Typography>

      <TableContainer component={Paper} elevation={4} sx={{ overflowX: "auto", p: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              {[
                "Subject Name",
                "Subject Code",
                "Department",
                "Year",
                "Semester",
                "Type",
                "Specialization",
                "Modules",
                "Actions",
              ].map((heading, index) => (
                <TableCell key={index} sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject._id} sx={{ "&:hover": { bgcolor: "#f9f9f9" } }}>
                <TableCell>{subject.name}</TableCell>
                <TableCell>{subject.code}</TableCell>
                <TableCell>{subject.department}</TableCell>
                <TableCell>{subject.year}</TableCell>
                <TableCell>{subject.sem}</TableCell>
                <TableCell>{subject.type}</TableCell>
                <TableCell>{subject.specialization || "N/A"}</TableCell>
                <TableCell>
                  <ul style={{ paddingLeft: 16, margin: 0 }}>
                    {subject.modules.map((module, idx) => (
                      <li key={idx} style={{ fontSize: "14px" }}>{module}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteSubject(subject._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%", textAlign: "center" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SubjectManagement;
