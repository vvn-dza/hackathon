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

const getRoleStyles = (role) => {
  switch (role) {
    case "admin":
      return { backgroundColor: "#FDECEC", color: "#E16259" };
    case "teacher":
    case "HOD":
      return { backgroundColor: "#EEF3FD", color: "#4A7CDA" };
    case "student":
      return { backgroundColor: "#F7F6F3", color: "#6B6860" };
    default:
      return { backgroundColor: "#F7F6F3", color: "#37352F" };
  }
};

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
      fetchUsers();
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
    <Box sx={{ width: "100%", mt: 2 }}>
      <Box sx={{ mb: 3 }}>
        <AddUser onAddUser={handleAddUser} />
      </Box>

      <Snackbar
        open={message.open}
        autoHideDuration={2500}
        onClose={() => setMessage({ ...message, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setMessage({ ...message, open: false })} severity={message.severity} sx={{ width: "100%", borderRadius: "8px" }}>
          {message.text}
        </Alert>
      </Snackbar>

      <TableContainer 
        component={Paper} 
        elevation={0}
        sx={{ 
          borderRadius: "10px", 
          border: "1px solid #E9E9E7",
          backgroundColor: "#FFFFFF"
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "right" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell sx={{ color: "#9B9A97", fontFamily: '"Inter", sans-serif' }}>
                  {user.email}
                </TableCell>
                <TableCell>
                   <Select
                     size="small"
                     value={selectedRoles[user._id] || user.role}
                     onChange={(e) => handleRoleChange(user._id, e.target.value)}
                     sx={{
                       height: '24px',
                       fontSize: '12px',
                       fontWeight: 500,
                       borderRadius: '4px',
                       '& .MuiSelect-select': {
                         padding: '2px 8px',
                         ...getRoleStyles(selectedRoles[user._id] || user.role)
                       },
                       '& fieldset': { border: 'none' },
                     }}
                   >
                     <MenuItem value="admin" sx={{ fontSize: '13px' }}>Admin</MenuItem>
                     <MenuItem value="teacher" sx={{ fontSize: '13px' }}>Teacher</MenuItem>
                     <MenuItem value="exam_staff" sx={{ fontSize: '13px' }}>Exam Staff</MenuItem>
                     <MenuItem value="HOD" sx={{ fontSize: '13px' }}>HOD</MenuItem>
                     <MenuItem value="student" sx={{ fontSize: '13px' }}>Student</MenuItem>
                   </Select>
                </TableCell>
                <TableCell sx={{ textAlign: "right" }}>
                  <Button 
                    size="small"
                    onClick={() => handleUpdateRole(user._id)} 
                    sx={{ 
                      mr: 1, 
                      fontSize: '12px',
                      color: "#37352F",
                      textTransform: "none",
                      '&:hover': { backgroundColor: "#EFEFEF" }
                    }}
                  >
                    Save
                  </Button>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDeleteUser(user._id)}
                    sx={{ '&:hover': { color: "#E16259" } }}
                  >
                    <DeleteIcon size={18} />
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
