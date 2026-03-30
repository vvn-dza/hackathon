import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Paper,
    Box,
    Grid,
    Button,
    AppBar,
    Toolbar,
    Card,
    CardContent,
    CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        // In a real app, you might fetch user details or decode the token here
        // For now, let's just confirm the user is authorized to be here
        // You could also fetch student-specific data here
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Student Dashboard
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Recent Activity */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                height: 240,
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Recent Activity
                            </Typography>
                            <Typography>
                                View your recent exams, assignments, and grades here.
                            </Typography>
                            {/* Add a list or table of recent activity later */}
                        </Paper>
                    </Grid>

                    {/* Quick Actions */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                height: 240,
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Quick Actions
                            </Typography>
                            <Button variant="outlined" sx={{ mb: 1 }}>
                                View Grades
                            </Button>
                            <Button variant="outlined" sx={{ mb: 1 }}>
                                Upcoming Exams
                            </Button>
                            <Button variant="outlined">Profile Settings</Button>
                        </Paper>
                    </Grid>

                    {/* Example Course Cards */}
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                            My Courses
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Mathematics 101
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Prof. Smith
                                </Typography>
                                <Typography variant="body2">
                                    Introduction to Calculus and Algebra.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">View Materials</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Physics 101
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Dr. Jones
                                </Typography>
                                <Typography variant="body2">
                                    Mechanics and Thermodynamics.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">View Materials</Button>
                            </CardActions>
                        </Card>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
};

export default StudentDashboard;
