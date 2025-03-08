import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import { Plus, FileSpreadsheet } from 'lucide-react';
import Layoutm from '../components/Layoutm';

export default function Patterns() {
  const patterns = [
    {
      id: 1,
      name: 'Mid-Term Pattern',
      subject: 'Mathematics',
      duration: '1.5 hours',
      totalMarks: 50,
    },
    {
      id: 2,
      name: 'Final Exam Pattern',
      subject: 'Physics',
      duration: '3 hours',
      totalMarks: 100,
    },
  ];

  return (
    <>
    <Layoutm/>
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h1">Paper Patterns</Typography>
        <Button variant="contained" startIcon={<Plus />}>
          Create Pattern
        </Button>
      </Box>

      <Grid container spacing={3}>
        {patterns.map((pattern) => (
          <Grid item xs={12} sm={6} md={4} key={pattern.id}>
            <Card>
              <CardContent>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  <FileSpreadsheet size={32} />
                </Box>
                <Typography variant="h6" gutterBottom>
                  {pattern.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Subject: {pattern.subject}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration: {pattern.duration}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Total Marks: {pattern.totalMarks}
                </Typography>
                <Button variant="outlined" fullWidth>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {patterns.length === 0 && (
        <Typography variant="body1" color="text.secondary" align="center">
          No patterns found. Create your first pattern to get started.
        </Typography>
      )}
    </Box>
    </>
  );
}