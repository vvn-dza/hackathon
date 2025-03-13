import React, { useEffect, useState } from "react";
import { getSubjects } from "../services/api";
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Paper,
  Box,
} from "@mui/material";

const ModuleManagement = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSubjects()
      .then((response) => {
        const allModules = response.data.flatMap(subject => subject.modules || []);
        setModules(allModules);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
        setError("Failed to load modules. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Module Management
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={3}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Card sx={{ mt: 2, boxShadow: 2, borderRadius: 2 }}>
            <CardContent>
              {modules.length > 0 ? (
                <List>
                  {modules.map((module, index) => (
                    <ListItem key={index} divider>
                      <ListItemText primary={module} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography color="textSecondary" align="center">
                  No modules available.
                </Typography>
              )}
            </CardContent>
          </Card>
        )}
      </Paper>
    </Container>
  );
};

export default ModuleManagement;