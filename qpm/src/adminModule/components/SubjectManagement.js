import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getSubjects } from "../services/api";

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState([]);

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

  const handleDeleteSubject = (code) => {
    const updatedSubjects = subjects.filter((subject) => subject.code !== code);
    setSubjects(updatedSubjects);
  };

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Subject Name</TableCell>
            <TableCell>Subject Code</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Semester</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Specialization</TableCell>
            <TableCell>Modules</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.map((subject, index) => (
            <TableRow key={index}>
              <TableCell>{subject.name}</TableCell>
              <TableCell>{subject.code}</TableCell>
              <TableCell>{subject.department}</TableCell>
              <TableCell>{subject.year}</TableCell>
              <TableCell>{subject.sem}</TableCell>
              <TableCell>{subject.type}</TableCell>
              <TableCell>{subject.specialization || "N/A"}</TableCell>
              <TableCell>
                <ul>
                  {subject.modules.map((module, idx) => (
                    <li key={idx}>{module}</li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleDeleteSubject(subject.code)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default SubjectManagement;
