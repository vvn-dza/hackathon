import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Plus } from 'lucide-react';

export default function Questions() {
  // State for Select components
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('');

  // State for search input
  const [searchQuery, setSearchQuery] = useState('');

  console.log('questions rendered');

  // Handle Add Question button click
  const handleAddQuestion = () => {
    // Add logic to open a form or dialog for adding a new question
    console.log('Add Question clicked');
  };

return (
<Box>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4">Question Bank</Typography>
          <Button
            variant="contained"
            startIcon={<Plus />}
            onClick={handleAddQuestion}
          >
            Add Question
          </Button>
        </Box>

        {/* Filters */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={3}>
              {/* Search Field */}
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Search Questions"
                  variant="outlined"
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Grid>

              {/* Subject Select */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Subject</InputLabel>
                  <Select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    label="Subject"
                  >
                    <MenuItem value="math">Mathematics</MenuItem>
                    <MenuItem value="physics">Physics</MenuItem>
                    <MenuItem value="chemistry">Chemistry</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Difficulty Select */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Difficulty</InputLabel>
                  <Select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    label="Difficulty"
                  >
                    <MenuItem value="easy">Easy</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="hard">Hard</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Question List */}
        <Typography variant="body1" color="text.secondary" align="center">
          No questions found. Add your first question to get started.
        </Typography>
    </Box>
    );
}