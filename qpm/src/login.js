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
  const theme = useTheme();

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
        }, 800);
      }
    } catch (error) {
      console.error("Login failed:", error);
      showAlert(error.response?.data?.message || "Login failed", "error");
    }
  };

  const roles = [
    { value: "student", label: "🎓 Student" },
    { value: "teacher", label: "📚 Faculty" },
    { value: "admin", label: "⚙️ Admin" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#F7F6F3",
        backgroundImage: "radial-gradient(circle, #D3D1CB 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#F7F6F3",
          opacity: 0.5,
          zIndex: 0,
        },
      }}
    >
      <style>
        {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <Paper
        elevation={0}
        sx={{
          width: "380px",
          padding: "40px 36px",
          borderRadius: "12px",
          border: "1px solid #E9E9E7",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
          backgroundColor: "#FFFFFF",
          zIndex: 1,
          animation: "fadeUp 0.4s ease forwards",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Logo Area */}
        <Box sx={{ textAlign: "center", mb: "28px" }}>
          <Typography sx={{ fontSize: "32px", mb: 1 }}>📋</Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#37352F", lineHeight: 1.2 }}>
            QPGS
          </Typography>
          <Typography variant="caption" sx={{ color: "#9B9A97", fontSize: "13px" }}>
            Question Paper Generator
          </Typography>
        </Box>

        {/* Role Selector */}
        <Box sx={{ width: "100%", mb: 3 }}>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              color: "#9B9A97",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              mb: 1,
            }}
          >
            Who are you?
          </Typography>
          <Box sx={{ display: "flex", gap: "8px" }}>
            {roles.map((role) => (
              <Box
                key={role.value}
                onClick={() => setUserType(role.value)}
                sx={{
                  flex: 1,
                  padding: "8px",
                  textAlign: "center",
                  fontSize: "13px",
                  fontWeight: userType === role.value ? 600 : 500,
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  backgroundColor: userType === role.value ? "#FFFFFF" : "#F7F6F3",
                  border: userType === role.value ? "1.5px solid #37352F" : "1px solid #E9E9E7",
                  color: userType === role.value ? "#37352F" : "#6B6860",
                  boxShadow: userType === role.value ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {role.label.split(" ")[0]}
                <br />
                {role.label.split(" ")[1]}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Inputs */}
        <Box sx={{ width: "100%", animation: "fadeUp 0.4s ease 0.08s forwards", opacity: 0 }}>
          <Typography sx={{ fontSize: "12px", fontWeight: 500, color: "#9B9A97", textTransform: "uppercase", mb: 0.5 }}>
            Email
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />

          <Typography sx={{ fontSize: "12px", fontWeight: 500, color: "#9B9A97", textTransform: "uppercase", mb: 0.5 }}>
            Password
          </Typography>
          <TextField
            fullWidth
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              height: "36px",
              backgroundColor: "#37352F",
              color: "#FFFFFF",
              fontWeight: 500,
              fontSize: "14px",
              "&:hover": { backgroundColor: "#1a1916" },
              "&:active": { transform: "scale(0.99)" },
            }}
          >
            Continue →
          </Button>
        </Box>

        <Box sx={{ width: "100%", height: "1px", backgroundColor: "#E9E9E7", my: "20px" }} />

        <Typography sx={{ fontSize: "12px", color: "#9B9A97", textAlign: "center" }}>
          Powered by QPGS · College Edition
        </Typography>
      </Paper>

      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: "100%", borderRadius: "8px" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
