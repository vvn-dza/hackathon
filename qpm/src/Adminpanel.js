import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Tabs,
  Tab,
  Box,
  ThemeProvider,
  Button,
} from "@mui/material";
import UserManagement from "./adminModule/components/userManagement";
import SubjectManagement from "./adminModule/components/SubjectManagement";
import ModuleManagement from "./adminModule/components/ModuleManagement";
import SyllabusUpload from "./adminModule/components/SyllabusUpload";
import AddSubject from "./adminModule/components/AddSubject";
import AddModule from "./adminModule/components/AddModule";
import theme from "./theme";
import { addSubject, addModule} from "./adminModule/services/api";
import { useNavigate } from "react-router-dom";

const Adminpanel = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  const handleAddSubject = async (subjectData) => {
    try {
      await addSubject(subjectData);
      alert("Subject added successfully!");
    } catch (error) {
      alert("Failed to add subject: " + error.message);
    }
  };

  const handleAddModule = async (moduleData) => {
    try {
      await addModule(moduleData);
      alert("Module added successfully!");
    } catch (error) {
      alert("Failed to add module: " + error.message);
    }
  };

  const handleLogout = () => {
    try {
     // Call the logout API
      localStorage.removeItem("token"); // Remove the JWT token from local storage
      navigate("/"); // Redirect to the login page
    } catch (error) {
      alert("Failed to logout: " + error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <AppBar position="static" color="primary" elevation={3}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Admin Module
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
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
              <AddSubject onAddSubject={handleAddSubject} />
              <AddModule onAddModule={handleAddModule} />
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