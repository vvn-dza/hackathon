
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const getUsers = () => axios.get(`${API_BASE_URL}/users`);
export const addUser = (user) => axios.post(`${API_BASE_URL}/users`, user);
export const updateUserRole = (id, role) => axios.put(`${API_BASE_URL}/users/${id}/role`, { role });
export const deleteUser = (id) => axios.delete(`${API_BASE_URL}/users/${id}`);

export const getSubjects = () => axios.get(`${API_BASE_URL}/subjects`);


export const getModules = () => axios.get(`${API_BASE_URL}/modules`);
export const addSubject = (subject) =>
    axios.post(`${API_BASE_URL}/subjects`, { subject });
  
  export const addModule = (module) =>
    axios.post(`${API_BASE_URL}/modules`, { module });



export const uploadSyllabus = (file) => {
  const formData = new FormData();
  formData.append("syllabus", file);
  return axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};