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
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls

const Login = () => {
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password || !userType) {
      alert("Please fill in all fields!");
      return;
    }

    try {
    const response = await axios.post("http://localhost:3001/api/v1/users/login", {
        email,
        password,
        role: userType,
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token); // Store token
        alert(`Logged in as ${userType}!`);

        if (userType === "admin") {
          navigate("/question-management]");
        } else if (userType === "teacher") {
          navigate("/faculty-dashboard");
        } else {
          navigate("/student-dashboard");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.message || "Login failed");
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
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Faculty</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
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
