import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: 'Helvetica, Arial, sans-serif',
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#F9FAFB",
          color: "#6B7280",
          fontWeight: 600,
          fontSize: "10.8px",
          textTransform: "uppercase",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#f1f1f1", // Add hover effect if needed
          },
        },
      },
    },
  },
});

export default theme;
