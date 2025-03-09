
import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Box } from "@mui/material";
import { getSubjects, addSubject } from "../services/api";

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const response = await getSubjects();
    setSubjects(response.data);
  };

  const handleAddSubject = async () => {
    const subject = prompt("Enter subject name:");
    if (!subject) return;
    await addSubject(subject);
    fetchSubjects();
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleAddSubject} sx={{ mb: 2 }}>
        Add Subject
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Subject Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.map((subject, index) => (
            <TableRow key={index}>
              <TableCell>{subject}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default SubjectManagement;