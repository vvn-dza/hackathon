import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { getSubjects } from "../services/api";

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const response = await getSubjects();
    setSubjects(response.data);
  };

  return (
    <Box>
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