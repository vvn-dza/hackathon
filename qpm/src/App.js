import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./login";
import QuestionManagement from "./QuestionManagement";
import Admin from "./Adminpanel";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/question-management" element={<QuestionManagement />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;
