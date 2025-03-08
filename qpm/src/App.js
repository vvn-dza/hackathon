<<<<<<< Updated upstream
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./login";
import QuestionManagement from "./QuestionManagement";
=======
import logo from './logo.svg';
import './App.css';
import TeacherModule from './Tcher';
>>>>>>> Stashed changes

const App = () => {
  return (
<<<<<<< Updated upstream
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/question-management" element={<QuestionManagement />} />
      </Routes>
    </div>
=======
   <TeacherModule/>
>>>>>>> Stashed changes
  );
};

export default App;
