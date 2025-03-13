import React, { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

const AddUser = ({ onAddUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState({ open: false, text: "", severity: "success" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !role) {
      setMessage({ open: true, text: "Please fill all fields!", severity: "error" });
      return;
    }
    onAddUser({ name, email, password, role });

    // Reset form fields
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
    setMessage({ open: true, text: "User added successfully!", severity: "success" });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: { xs: "100%", sm: 450 },
        mx: "auto",
        textAlign: "center",
        mt: 5,
        px: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Add New User
      </Typography>

      {/* Snackbar for feedback */}
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

      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
        sx={{ mt: 2 }}
      />

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
        sx={{ mt: 2 }}
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
        sx={{ mt: 2 }}
      />

      <FormControl fullWidth required sx={{ mt: 2 }}>
        <InputLabel>Select Role</InputLabel>
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
          <MenuItem value="exam_staff">Exam Staff</MenuItem>
          <MenuItem value="HOD">HOD</MenuItem>
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.5 }}>
        Add User
      </Button>
    </Box>
  );
};

export default AddUser;
