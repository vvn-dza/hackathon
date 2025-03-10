import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import {
  FileQuestion,
  FileSpreadsheet,
  FileOutput,
  BarChart3,
  ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Facultydashboard() {
  const navigate = useNavigate();
  console.log('Facultydashboard rendered');

  const cards = [
    {
      title: 'Question Bank',
      description: 'Manage and organize your questions efficiently',
      icon: <FileQuestion size={48} />,
      path: '/questions',
      count: '250+',
      label: 'Questions',
    },
    {
      title: 'Paper Patterns',
      description: 'Create and customize paper patterns',
      icon: <FileSpreadsheet size={48} />,
      path: '/patterns',
      count: '15',
      label: 'Patterns',
    },
    {
      title: 'Generated Papers',
      description: 'View and manage generated question papers',
      icon: <FileOutput size={48} />,
      path: '/generate',
      count: '45',
      label: 'Papers',
    },
    {
      title: 'Analytics',
      description: 'Track and analyze system usage',
      icon: <BarChart3 size={48} />,
      path: '/reports',
      count: '10+',
      label: 'Reports',
    },
  ];

return (
<Box>
        <Typography variant="h1" gutterBottom>
          Welcome to QPGS
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Manage your question bank, create patterns, and generate question papers efficiently.
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {cards.map((card) => (
            <Grid item xs={12} sm={6} md={3} key={card.title}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {card.icon}
                  </Box>
                  <Typography variant="h4" gutterBottom>
                    {card.count}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.label}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {card.description}
                  </Typography>
                  <Button
                    variant="contained"
                    endIcon={<ChevronRight />}
                    onClick={() => navigate(card.path)}
                    fullWidth
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
    </Box>
    );
}