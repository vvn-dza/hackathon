import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./login";
import QuestionManagement from "./QuestionManagement"; // Question Management page
import Admin from "./Adminpanel";
import Layoutm from "./teacherModule/components/Layoutm"; // Import Layoutm

import Facultydashboard from "./teacherModule/pages/Facultydashboard";
import GeneratePaper from "./teacherModule/pages/GeneratePaper";
import Patterns from "./teacherModule/pages/Patterns";
import Questions from "./teacherModule/pages/Questions";
import Reports from "./teacherModule/pages/Reports";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Default route for login */}
        <Route path="/" element={<Login />} />

        {/* Question Management Route */}
        <Route path="/question-management" element={<QuestionManagement />} />

        {/* Admin Module Route */}
        <Route path="/admin" element={<Admin />} />

        {/* Teacher Module Routes */}
        <Route path="/faculty-dashboard" element={<Layoutm />}>
          <Route index element={<Facultydashboard />} /> {/* Default route for /faculty-dashboard */}
          <Route path="generate" element={<GeneratePaper />} /> {/* /faculty-dashboard/generate */}
          <Route path="patterns" element={<Patterns />} /> {/* /faculty-dashboard/patterns */}
          <Route path="questions" element={<Questions />} /> {/* /faculty-dashboard/questions */}
          <Route path="reports" element={<Reports />} /> {/* /faculty-dashboard/reports */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;