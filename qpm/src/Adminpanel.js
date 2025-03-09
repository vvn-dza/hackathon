// src/Adminpanel.js
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Container, Paper, Tabs, Tab, Box, ThemeProvider } from "@mui/material";
import UserManagement from "./adminModule/components/userManagement";
import SubjectManagement from "./adminModule/components/SubjectManagement";
import ModuleManagement from "./adminModule/components/ModuleManagement";
import SyllabusUpload from "./adminModule/components/SyllabusUpload";
import theme from "./theme";

const Adminpanel = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <AppBar position="static" color="primary" elevation={3}>
          <Toolbar>
            <Typography variant="h6">Admin Module</Typography>
          </Toolbar>
        </AppBar>

        <Paper sx={{ mt: 3, p: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab label="User Roles" />
            <Tab label="Subjects & Modules" />
            <Tab label="Syllabus Upload" />
          </Tabs>
        </Paper>

        <Box sx={{ mt: 3 }}>
          {activeTab === 0 && <UserManagement />}
          {activeTab === 1 && (
            <Box>
              <SubjectManagement />
              <ModuleManagement />
            </Box>
          )}
          {activeTab === 2 && <SyllabusUpload />}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Adminpanel;