
import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Box } from "@mui/material";
import { getModules, addModule } from "../services/api";

const ModuleManagement = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    const response = await getModules();
    setModules(response.data);
  };

  const handleAddModule = async () => {
    const module = prompt("Enter module name:");
    if (!module) return;
    await addModule(module);
    fetchModules();
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleAddModule} sx={{ mb: 2 }}>
        Add Module
      </Button>
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