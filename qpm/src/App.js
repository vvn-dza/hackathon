import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./login";
import QuestionManagement from "./QuestionManagement";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/question-management" element={<QuestionManagement />} />
      </Routes>
    </div>
  );
};

export default App;
