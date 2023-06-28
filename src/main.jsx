import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#344955",
      darkerBlue: "#232F34",
      LighterBlue: "#4A6572",
    },
    secondary: {
      main: "#F9AA33",
    },
    backgroundColor: {
      main: "#edf0f2",
    },
    likeColor: {
      main: "#dc4c64",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </ThemeProvider>
  </BrowserRouter>
);
