import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme"; // Import your custom theme

import Login from "./login";
import QuestionManagement from "./teacherModule/pages/QuestionManagement";
import Admin from "./Adminpanel";
import Layoutm from "./teacherModule/components/Layoutm";
import Facultydashboard from "./teacherModule/pages/Facultydashboard";
import QuestionPaperGenerator from "./teacherModule/pages/QuestionPaperGenerator";
import Reports from "./teacherModule/pages/Reports";
import ManagementModule from "./teacherModule/pages/ManagementModule";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures consistent background and colors */}
      <Routes>
        {/* Default route for login */}
        <Route path="/" element={<Login />} />

        {/* Admin Module Route */}
        <Route path="/admin" element={<Admin />} />

        {/* Teacher Module Routes */}
        <Route path="/faculty-dashboard" element={<Layoutm />}>
          <Route index element={<Facultydashboard />} />
          <Route path="generate" element={<QuestionPaperGenerator />} />
          <Route path="reports" element={<Reports />} />
          <Route path="patterns" element={<ManagementModule />} />
          <Route path="questions" element={<QuestionManagement />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
