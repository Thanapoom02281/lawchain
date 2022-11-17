import { EthProvider } from "./contexts/EthContext";
import "./App.css";
import Test from "./components/Test/test";
import React from "react";
import Home from "./pages/home";
import { createTheme, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#021630",
    },
    secondary: {
      main: "#FF9C07",
    },
  },
});

function App() {
  return (
    <EthProvider>
      {/* <Test/> */}
      <ThemeProvider theme={darkTheme}>
      <Home />
      </ThemeProvider>
    </EthProvider>
  );
}

export default App;
