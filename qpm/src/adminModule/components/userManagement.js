
import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, FormControl, IconButton, Button, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getUsers, addUser, updateUserRole, deleteUser } from "../services/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles] = useState(["Super Admin", "Teacher", "Student"]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };

  const handleAddUser = async () => {
    const name = prompt("Enter user name:");
    if (!name) return;
    const response = await addUser({ name, role: "", subjects: [] });
    setUsers([...users, response.data]);
  };

  const handleRoleChange = async (id, role) => {
    await updateUserRole(id, role);
    fetchUsers();
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleAddUser} sx={{ mb: 2 }}>
        Add User
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <Select value={user.role} onChange={(e) => handleRoleChange(user.id, e.target.value)}>
                    {roles.map((role, index) => (
                      <MenuItem key={index} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <IconButton color="secondary" onClick={() => handleDeleteUser(user.id)}>
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