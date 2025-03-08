import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Tabs,
  Tab,
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ThemeProvider,
  createTheme,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const theme = createTheme({
  palette: {
    primary: { main: "#1e88e5" },
    secondary: { main: "#d32f2f" },
    background: { default: "#f5f5f5" },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h6: { fontWeight: 600 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

const AdminModule = () => {
  const [tab, setTab] = useState(0);
  const [users, setUsers] = useState([
    { id: 1, name: "Admin", role: "Super Admin", subjects: [] },
    { id: 2, name: "John Doe", role: "Teacher", subjects: [] },
  ]);
  const [roles] = useState(["Super Admin", "Teacher", "Student"]);
  const [subjects, setSubjects] = useState(["None", "Mathematics", "Physics"]);
  const [modules, setModules] = useState(["Algebra", "Quantum Mechanics"]);
  const [syllabus, setSyllabus] = useState(null);

  const handleTabChange = (event, newValue) => setTab(newValue);

  const handleAddUser = () => {
    const name = prompt("Enter user name:");
    if (!name) return;

    setUsers([...users, { id: users.length + 1, name, role: "", subjects: [] }]);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleRoleChange = (id, role) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, role } : user)));
  };

  const handleSubjectChange = (id, subject) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, subjects: subject === "None" ? [] : [subject] } : user)));
  };

  const handleAddSubject = () => {
    const subject = prompt("Enter subject name:");
    if (subject) setSubjects([...subjects, subject]);
  };

  const handleAddModule = () => {
    const module = prompt("Enter module name:");
    if (module) setModules([...modules, module]);
  };

  const handleSyllabusUpload = (event) => setSyllabus(event.target.files[0]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <AppBar position="static" color="primary" elevation={3}>
          <Toolbar>
            <Typography variant="h6">Admin Module</Typography>
          </Toolbar>
        </AppBar>

        <Paper sx={{ mt: 3, p: 3 }}>
          <Tabs value={tab} onChange={handleTabChange} centered>
            <Tab label="User Roles" />
            <Tab label="Subjects & Modules" />
            <Tab label="Syllabus Upload" />
          </Tabs>
        </Paper>

        <Box sx={{ mt: 3 }}>
          {/* User Roles Management */}
          {tab === 0 && (
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddUser}
                sx={{ mb: 2 }}
              >
                Add User
              </Button>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Assigned Subjects</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>
                        <FormControl fullWidth>
                          <Select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            displayEmpty
                          >
                            <MenuItem value="">Select Role</MenuItem>
                            {roles.map((role, index) => (
                              <MenuItem key={index} value={role}>
                                {role}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl fullWidth>
                          <Select
                            value={user.subjects.length > 0 ? user.subjects[0] : "None"}
                            onChange={(e) => handleSubjectChange(user.id, e.target.value)}
                          >
                            {subjects.map((subject, index) => (
                              <MenuItem key={index} value={subject}>
                                {subject}
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
          )}

          {/* Subjects & Modules Management */}
          {tab === 1 && (
            <Box>
              {/* Subjects */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddSubject}
                sx={{ mb: 2 }}
              >
                Add Subject
              </Button>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Subject Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjects.map((subject, index) => (
                    <TableRow key={index}>
                      <TableCell>{subject}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Modules */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddModule}
                sx={{ mt: 2, mb: 2 }}
              >
                Add Module
              </Button>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Module Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {modules.map((module, index) => (
                    <TableRow key={index}>
                      <TableCell>{module}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}

          {/* Syllabus Upload */}
          {tab === 2 && (
            <Box>
              <Typography variant="h6">Upload Syllabus</Typography>
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{ mt: 2 }}
              >
                Upload File
                <input type="file" hidden onChange={handleSyllabusUpload} />
              </Button>
              {syllabus && (
                <Typography sx={{ mt: 2 }}>
                  Uploaded File: {syllabus.name}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AdminModule;
