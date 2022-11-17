import React from "react";
import {
  AppBar,
  Card,
  IconButton,
  Input,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

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

export default function Navbar() {
  const nevigate = useNavigate()
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h2" color="white" component="div" onClick={() => nevigate('/')}>
              Law
            </Typography>
            <Typography variant="h2" color="orange" component="div" sx={{ flexGrow: 1 }} onClick={() => nevigate('/')}>
              Chain
            </Typography>
            <Button color="secondary" onClick={() => nevigate('/')}>
              <h1>
                หน้าแรก
              </h1>
            </Button>
            <Button color="secondary" onClick={() => nevigate('/searchlaw')}>
              <h1>
                ค้นหากฏหมาย
              </h1>
            </Button>
            <Button color="secondary">
              <h1>
                ค้นหาคำตัดสิน
              </h1>
            </Button>
            {/* <a href="/searchLaw">ค้นหาคำตัดสิน</a> */}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
