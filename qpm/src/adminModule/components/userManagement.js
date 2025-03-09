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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddUser from "./AddUser";
import { getUsers, addUser, deleteUser, updateUserRole } from "../services/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({}); // Track selected roles for each user

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
    // Initialize selected roles state
    const roles = {};
    response.data.forEach((user) => {
      roles[user._id] = user.role;
    });
    setSelectedRoles(roles);
  };

  const handleAddUser = async (user) => {
    try {
      const response = await addUser(user);
      setUsers([...users, response.data]);
    } catch (error) {
      alert("Failed to add user: " + error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleRoleChange = (id, role) => {
    setSelectedRoles((prev) => ({ ...prev, [id]: role }));
  };

  const handleUpdateRole = async (id) => {
    const role = selectedRoles[id];
    if (!role) {
      alert("Please select a role!");
      return;
    }
    try {
      await updateUserRole(id, role);
      fetchUsers(); // Refresh the user list
      alert("Role updated successfully!");
    } catch (error) {
      alert("Failed to update role: " + error.message);
    }
  };

  return (
    <Box>
      <AddUser onAddUser={handleAddUser} />
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
                  <Select
                    value={selectedRoles[user._id] || user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="teacher">Teacher</MenuItem>
                    <MenuItem value="exam_staff">Exam Staff</MenuItem>
                    <MenuItem value="HOD">HOD</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateRole(user._id)}
                  sx={{ mr: 1 }}
                >
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
    </Box>
  );
};

export default UserManagement;