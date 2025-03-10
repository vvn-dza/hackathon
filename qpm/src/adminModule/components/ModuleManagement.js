import React, { useEffect, useState } from "react";
import { getSubjects } from "../services/api"; // Correct import

const ModuleManagement = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    getSubjects()
      .then((response) => {
        // Extract modules from subjects
        const allModules = response.data.flatMap(subject => subject.modules || []);
        setModules(allModules);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
      });
  }, []);

  return (
    <div>
      <h2>Module Management</h2>
      <ul>
        {modules.map((module, index) => (
          <li key={index}>{module}</li>
        ))}
      </ul>
    </div>
  );
};

export default ModuleManagement;
