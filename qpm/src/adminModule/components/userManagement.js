import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
  Select,
  MenuItem,
  FormControl,
  Button,
  Snackbar,
  Alert,
  TableContainer,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddUser from "./AddUser";
import { getUsers, addUser, deleteUser, updateUserRole } from "../services/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});
  const [message, setMessage] = useState({ open: false, text: "", severity: "success" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);

      // Initialize selected roles state
      const roles = {};
      response.data.forEach((user) => {
        roles[user._id] = user.role;
      });
      setSelectedRoles(roles);
    } catch (error) {
      setMessage({ open: true, text: "Failed to fetch users!", severity: "error" });
    }
  };

  const handleAddUser = async (user) => {
    try {
      const response = await addUser(user);
      setUsers([...users, response.data]);
      setMessage({ open: true, text: "User added successfully!", severity: "success" });
    } catch (error) {
      setMessage({ open: true, text: "Failed to add user!", severity: "error" });
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers(); // Refresh the user list
      setMessage({ open: true, text: "User deleted successfully!", severity: "success" });
    } catch (error) {
      setMessage({ open: true, text: "Failed to delete user!", severity: "error" });
    }
  };
  

  const handleRoleChange = (id, role) => {
    setSelectedRoles((prev) => ({ ...prev, [id]: role }));
  };

  const handleUpdateRole = async (id) => {
    const role = selectedRoles[id];
    if (!role) {
      setMessage({ open: true, text: "Please select a role!", severity: "error" });
      return;
    }
    try {
      await updateUserRole(id, role);
      fetchUsers();
      setMessage({ open: true, text: "Role updated successfully!", severity: "success" });
    } catch (error) {
      setMessage({ open: true, text: "Failed to update role!", severity: "error" });
    }
  };

  return (
    <Box sx={{ maxWidth: "90%", mx: "auto", mt: 5 }}>
      <AddUser onAddUser={handleAddUser} />

      <Snackbar
        open={message.open}
        autoHideDuration={2500}
        onClose={() => setMessage({ ...message, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setMessage({ ...message, open: false })} severity={message.severity} sx={{ width: "100%" }}>
          {message.text}
        </Alert>
      </Snackbar>

      <TableContainer component={Paper} sx={{ mt: 4, overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Select value={selectedRoles[user._id] || user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)}>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="teacher">Teacher</MenuItem>
                      <MenuItem value="exam_staff">Exam Staff</MenuItem>
                      <MenuItem value="HOD">HOD</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleUpdateRole(user._id)} sx={{ mr: 1 }}>
                    Update Role
                  </Button>
                  <IconButton color="secondary" onClick={() => handleDeleteUser(user._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserManagement;
