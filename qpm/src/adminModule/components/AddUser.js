import React, { useState } from "react";
import { Box, TextField, Select, MenuItem, FormControl,Button, Typography } from "@mui/material";

const AddUser = ({ onAddUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !role) {
      alert("Please fill all fields!");
      return;
    }
    onAddUser({ name, email, password, role });
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add New User
      </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <FormControl fullWidth margin="normal" required>
        <Select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select Role
          </MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
          <MenuItem value="exam_staff">Exam Staff</MenuItem>
          <MenuItem value="HOD">HOD</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Add User
      </Button>
    </Box>
  );
};

export default AddUser;