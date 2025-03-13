import { Box, Card, CardContent, Grid, Typography, Button } from "@mui/material";
import { FileQuestion, FileSpreadsheet, FileOutput, BarChart3, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function Facultydashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  console.log("Facultydashboard rendered");

  const cards = [
    {
      title: "Question Bank",
      description: "Manage and organize your questions efficiently",
      icon: <FileQuestion size={48} />,
      path: "/questions",
      count: "",
      label: "Questions",
    },
    // {
    //   title: "Paper Patterns",
    //   description: "Create and customize paper patterns",
    //   icon: <FileSpreadsheet size={48} />,
    //   path: "/patterns",
    //   count: "15",
    //   label: "Patterns",
    // },
    {
      title: "Generated Papers",
      description: "View and manage generated question papers",
      icon: <FileOutput size={48} />,
      path: "/generate",
      count: "",
      label: "Papers",
    },
    // {
    //   title: "Analytics",
    //   description: "Track and analyze system usage",
    //   icon: <BarChart3 size={48} />,
    //   path: "/reports",
    //   count: "10+",
    //   label: "Reports",
    // },
  ];

  return (
    <Box sx={{ p: 3, textAlign: "center", backgroundColor: theme.palette.background.default }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" sx={{ color: theme.palette.text.primary, mb: 1 }}>
        Welcome to QPGS
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: theme.palette.text.secondary, maxWidth: "600px", mx: "auto" }}
      >
        Manage your question bank, create patterns, and generate question papers efficiently.
      </Typography>

      {/* Grid Layout */}
      <Grid container spacing={3} sx={{ mt: 4, justifyContent: "center" }}>
        {cards.map((card) => (
          <Grid item xs={12} sm={4} md={3} key={card.title}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                textAlign: "center",
                borderRadius: "16px",
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
                p: 2,
                background: theme.palette.background.paper,
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>{card.icon}</Box>
                <Typography variant="h5" fontWeight="bold" sx={{ color: theme.palette.text.primary }}>
                  {card.count}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  {card.label}
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, color: theme.palette.text.primary }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  {card.description}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                endIcon={<ChevronRight />}
                onClick={() => navigate(card.path)}
                sx={{
                  mt: 2,
                  width: "100%",
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.main,
                  },
                }}
              >
                View Details
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
