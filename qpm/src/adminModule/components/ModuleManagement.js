import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { getModules } from "../services/api";

const ModuleManagement = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    const response = await getModules();
    setModules(response.data);
  };

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Module Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {modules.map((module, index) => (
            <TableRow key={index}>
              <TableCell>{module}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ModuleManagement;