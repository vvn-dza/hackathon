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

const App = () => {
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password || !userType) {
      alert("Please fill in all fields!");
      return;
    }
    alert(`Logged in as ${userType}!`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f7fa", // Light Grey Background
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: "30px",
            borderRadius: "12px",
            textAlign: "center",
            backgroundColor: "#ffffff", // White Paper
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow
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
            sx={{ bgcolor: "#f0f3f7", borderRadius: "5px" }}
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
            sx={{ bgcolor: "#f0f3f7", borderRadius: "5px" }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            sx={{ bgcolor: "#f0f3f7", borderRadius: "5px" }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{
              marginTop: "20px",
              borderRadius: "6px",
              padding: "10px",
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            Login
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default App;
