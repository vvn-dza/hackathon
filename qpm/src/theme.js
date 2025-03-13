import { createTheme } from "@mui/material/styles";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#7f5fb8", // Deep Purple
    },
    secondary: {
      main: "#8757c2", // Amber
    },
    background: {
      default: "#FAF9F6", // Soft Creamy White
      paper: "#FFFFFF", // White for better contrast
    },
    text: {
      primary: "#2E2E2E", // Dark Gray for better readability
      secondary: "#6D6D6D", // Medium Gray
    },
  },
  typography: {
    fontFamily: `"Poppins", "Roboto", sans-serif`,
    h4: {
      fontWeight: 700,
      color: "#333333", // Dark text for titles
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      color: "#444", // Slightly dark gray for better contrast
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "20px",
          borderRadius: "16px", // Smoother curves
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)", // Softer shadow
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
