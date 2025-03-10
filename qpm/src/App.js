import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./login";
import QuestionManagement from "./teacherModule/pages/QuestionManagement"; // Question Management page
import Admin from "./Adminpanel";
import Layoutm from "./teacherModule/components/Layoutm"; // Import Layoutm

import Facultydashboard from "./teacherModule/pages/Facultydashboard";
import QuestionPaperGenerator from "./teacherModule/pages/QuestionPaperGenerator";


import Reports from "./teacherModule/pages/Reports";
import ManagementModule from "./teacherModule/pages/ManagementModule";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Default route for login */}
        <Route path="/" element={<Login />} />

       
        

        {/* Admin Module Route */}
        <Route path="/admin" element={<Admin />} />

        {/* Teacher Module Routes */}
        <Route path="/faculty-dashboard" element={<Layoutm />}>
          <Route index element={<Facultydashboard />} /> {/* Default route for /faculty-dashboard */}
          <Route path="generate" element={<QuestionPaperGenerator />} /> {/* /faculty-dashboard/generate */}
       
        
          <Route path="reports" element={<Reports />} /> {/* /faculty-dashboard/reports */}
          <Route path="*" element={<h1>Page Not Found</h1>} /> {/* Fallback for unknown routes */}
          <Route path="patterns" element={<ManagementModule/>}/>
          <Route path="questions" element={<QuestionManagement/>}/>
        </Route>
         
        
      </Routes>
    </div>
  );
};

export default App;