import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Box,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const navigate = useNavigate();
  const theme = useTheme(); // Import MUI theme

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleClose = () => {
    setAlertOpen(false);
  };

  const handleLogin = async () => {
    if (!email || !password || !userType) {
      showAlert("Please fill in all fields!", "warning");
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
        localStorage.setItem("token", token);
        showAlert(`Logged in as ${userType}!`, "success");

        setTimeout(() => {
          if (userType === "admin") {
            navigate("/admin");
          } else if (userType === "teacher") {
            navigate("/faculty-dashboard");
          } else {
            navigate("/student-dashboard");
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Login failed:", error);
      showAlert(error.response?.data?.message || "Login failed", "error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default, // Use theme background color
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: "30px",
            borderRadius: "10px",
            textAlign: "center",
            backgroundColor: theme.palette.background.paper, // Use theme color
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            Login
          </Typography>

          <TextField
            select
            fullWidth
            label="Select Role"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            margin="normal"
            sx={{ borderRadius: "6px" }}
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
            sx={{ borderRadius: "6px" }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            sx={{ borderRadius: "6px" }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            sx={{
              marginTop: "20px",
              borderRadius: "6px",
              padding: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Login
          </Button>
        </Paper>

        {/* Snackbar for modern alerts */}
        <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: "100%" }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Login;
