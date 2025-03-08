import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { FileOutput } from 'lucide-react';

export default function GeneratePaper() {
  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        Generate Question Paper
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Paper Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Select Pattern</InputLabel>
                    <Select label="Select Pattern">
                      <MenuItem value="midterm">Mid-Term Pattern</MenuItem>
                      <MenuItem value="final">Final Exam Pattern</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Subject</InputLabel>
                    <Select label="Subject">
                      <MenuItem value="math">Mathematics</MenuItem>
                      <MenuItem value="physics">Physics</MenuItem>
                      <MenuItem value="chemistry">Chemistry</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Exam Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Duration (hours)"
                    type="number"
                    InputProps={{ inputProps: { min: 0, step: 0.5 } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<FileOutput />}
                    fullWidth
                  >
                    Generate Paper
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pattern Summary
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Select a pattern to view its summary
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}