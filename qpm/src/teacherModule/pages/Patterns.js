import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import axios from 'axios';

const Patterns = ({ subjectCode }) => {
  const [examPattern, setExamPattern] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamPattern = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/patterns/${subjectCode}`);
        setExamPattern(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchExamPattern();
  }, [subjectCode]);

  if (loading) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h4">Error: {error}</Typography>;
  }

  const generateExamPattern = () => {
    const partAQuestions = Array.from({ length: examPattern.partA.numberOfQuestions }, (_, index) => ({
      id: `partA-${index + 1}`,
      text: `Part A Question ${index + 1}`,
      marks: examPattern.partA.marksPerQuestion,
    }));

    const partBModules = examPattern.partB.modules.map((module) => {
      const moduleQuestions = module.questions.slice(0, module.numberOfQuestions).map((question, index) => ({
        id: `partB-${module.moduleName}-${index + 1}`,
        text: `Part B ${module.moduleName} Question ${index + 1}`,
        marks: 8,
      }));
      return {
        ...module,
        questions: moduleQuestions,
      };
    });

    setExamPattern({
      partA: {
        ...examPattern.partA,
        questions: partAQuestions,
      },
      partB: {
        modules: partBModules,
      },
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Exam Pattern for {examPattern.patternName}
      </Typography>
      <Button variant="contained" onClick={generateExamPattern} sx={{ mb: 4 }}>
        Generate Exam Pattern
      </Button>

      {/* Part A */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Part A: 10 Questions (2 Marks Each)
          </Typography>
          <List>
            {examPattern.partA.questions.map((question) => (
              <ListItem key={question.id}>
                <ListItemText
                  primary={question.text}
                  secondary={`Marks: ${question.marks}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Part B */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Part B: 5 Questions from Each Module (8 Marks Each)
          </Typography>
          <Grid container spacing={3}>
            {examPattern.partB.modules.map((module) => (
              <Grid item xs={12} sm={6} md={4} key={module.moduleName}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      {module.moduleName}
                    </Typography>
                    <List>
                      {module.questions.map((question) => (
                        <ListItem key={question.id}>
                          <ListItemText
                            primary={question.text}
                            secondary={`Marks: ${question.marks}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

Patterns.defaultProps = {
  subjectCode: "DEFAULT_SUBJECT_CODE",
};

export default Patterns;
