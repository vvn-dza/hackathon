import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#37352F", // Notion's exact text color
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#E16259", // Warm terracotta red
    },
    background: {
      default: "#F7F6F3", // Notion-style warm gray page
      paper: "#FFFFFF", // Cards
    },
    text: {
      primary: "#37352F",
      secondary: "#6B6860", // Notion text-mid
      disabled: "#9B9A97", // Notion text-light
    },
    divider: "#E9E9E7", // Warm gray border
  },
  typography: {
    fontFamily: '"Inter", "system-ui", "-apple-system", "sans-serif"',
    h1: { fontSize: "30px", fontWeight: 600, color: "#37352F" },
    h2: { fontSize: "24px", fontWeight: 600, color: "#37352F" },
    h3: { fontSize: "20px", fontWeight: 600, color: "#37352F" },
    h4: { fontSize: "22px", fontWeight: 600, color: "#37352F" },
    h5: { fontSize: "18px", fontWeight: 600, color: "#37352F" },
    h6: { fontSize: "15px", fontWeight: 600, color: "#37352F" },
    body1: { fontSize: "14px", fontWeight: 400, color: "#37352F", lineHeight: 1.6 },
    body2: { fontSize: "13px", fontWeight: 400, color: "#6B6860" },
    caption: { fontSize: "12px", fontWeight: 400, color: "#9B9A97" },
    button: { fontSize: "14px", fontWeight: 500, textTransform: "none" },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid #E9E9E7",
          boxShadow: "none",
          "&.MuiPaper-elevation1": {
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          padding: "6px 14px",
          transition: "all 0.15s ease",
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "#EFEFEF",
          },
          "&.MuiButton-containedPrimary": {
            "&:hover": {
              backgroundColor: "#1a1916",
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#FFFFFF",
          borderRight: "1px solid #E9E9E7",
          width: 260,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(8px)",
          color: "#37352F",
          boxShadow: "none",
          borderBottom: "1px solid #E9E9E7",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "& fieldset": {
              borderColor: "#E9E9E7",
            },
            "&:hover fieldset": {
              borderColor: "#D3D1CB",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#37352F",
              borderWidth: "1px",
              boxShadow: "0 0 0 2px rgba(55,53,47,0.08)",
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          minWidth: 0,
          marginRight: "4px",
          padding: "6px 12px",
          borderRadius: "6px 6px 0 0",
          color: "#9B9A97",
          transition: "0.15s ease",
          "&:hover": {
            color: "#37352F",
            backgroundColor: "#F7F6F3",
          },
          "&.Mui-selected": {
            color: "#37352F",
            fontWeight: 500,
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: "separate",
          borderSpacing: 0,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#F7F6F3",
          "& .MuiTableCell-root": {
            fontSize: "11px",
            fontWeight: 500,
            color: "#9B9A97",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
            borderBottom: "1px solid #E9E9E7",
            padding: "10px 16px",
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: "background-color 0.1s ease",
          "&:hover": {
            backgroundColor: "#F7F6F3",
          },
          "&.Mui-selected": {
            backgroundColor: "#EFEFEF",
            "&:hover": {
              backgroundColor: "#EFEFEF",
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          color: "#37352F",
          borderBottom: "1px solid #E9E9E7",
          padding: "12px 16px",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          padding: "6px",
          color: "#9B9A97",
          transition: "all 0.15s ease",
          "&:hover": {
            backgroundColor: "#EFEFEF",
            color: "#37352F",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: "8px 12px",
          fontSize: "14px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "14px",
        },
      },
    },
  },
});

export default theme;
