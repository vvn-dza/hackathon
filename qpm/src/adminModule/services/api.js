import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api/v1";

// Authentication APIs
export const loginUser = (userData) => axios.post(`${API_BASE_URL}/users/login`, userData);
export const registerUser = (userData) => axios.post(`${API_BASE_URL}/users/register`, userData);

// User Management APIs
export const getUsers = () => axios.get(`${API_BASE_URL}/users`);
export const addUser = (user) => axios.post(`${API_BASE_URL}/users/register`, user);
export const updateUser = (id, userData) => axios.put(`${API_BASE_URL}/users/${id}`, userData);
export const updateUserRole = (id, role) => axios.put(`${API_BASE_URL}/users/${id}`, { role });

export const deleteUser = (id) => axios.delete(`${API_BASE_URL}/users/${id}`);

// Subject and Module Management APIs
export const getSubjects = () => axios.get(`${API_BASE_URL}/subjects`);
export const addSubject = (subject) => axios.post(`${API_BASE_URL}/subjects`, { subject });

// Add a module to a subject's module array
export const addModule = (subjectCode, moduleName) =>
  axios.put(`${API_BASE_URL}/subjects/${subjectCode}/modules`, { module: moduleName });

export const uploadSyllabus = async (courseCode, file) => {
  const formData = new FormData();
  formData.append("courseCode", courseCode);
  formData.append("syllabusFile", file);

  return await axios.post(`${API_BASE_URL}/syllabus/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getSyllabus = async () => {
  return await axios.get(`${API_BASE_URL}/syllabus`);
};

export const deleteSyllabus = async (id) => {
  return await axios.delete(`${API_BASE_URL}/syllabus/${id}`);
};

export const deleteSubject = async (id) => {
  const response = await fetch(`/api/subjects/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete subject");
  }

  return response.json();
};
