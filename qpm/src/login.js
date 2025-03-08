import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = () => {
    if (!username || !password || !userType) {
      alert("Please fill in all fields!");
      return;
    }

    alert(`Logged in as ${userType}!`);

    // Navigate to QuestionManagement only if the user is "Admin"
    if (userType === "Admin") {
      navigate("/question-management"); // Navigate on successful login
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: "30px",
            borderRadius: "12px",
            textAlign: "center",
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "#1976d2" }}>
            Login
          </Typography>

          <TextField
            select
            fullWidth
            label="Select Role"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            margin="normal"
          >
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Faculty">Faculty</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />

          {/* Button for login */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin} // Call function to navigate
            sx={{ marginTop: "20px", borderRadius: "6px", padding: "10px" }}
          >
            Login
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};



export default Login;
