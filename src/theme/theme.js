// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
    allVariants: {
      color: "rgb(55, 65, 81)", // default font color
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: 600,
      color: "rgba(0, 0, 0, 0.87)", // heading color
    },
  },
  palette: {
    primary: {
      main: "#58a942", // button color
    },
    error: {
      main: "#dc2626", // delete button color
    },
    background: {
      default: "#f8f9fa", // app background
    },
    text: {
      primary: "rgb(55, 65, 81)", // font color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 1px 3px 0 #0000001a, 0 1px 2px 0 #0000000f", // button shadow
          textTransform: "none", // prevent all caps
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 1px 3px 0 #0000001a, 0 1px 2px 0 #0000000f", // card shadow
        },
      },
    },
  },
});

export default theme;
