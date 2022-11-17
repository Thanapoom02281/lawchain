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
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h2" color="white" component="div">
              Law
            </Typography>
            <Typography variant="h2" color="orange" component="div" sx={{ flexGrow: 1 }}>
              Chain
            </Typography>
            <Button color="secondary" onClick={() => console.log('ysy')}>
              <h1>
                ค้นหาคำตัดสิน
              </h1>
            </Button>
            {/* <a href="/searchLaw">ค้นหาคำตัดสิน</a> */}
            <Button color="secondary">
              <h1>
                ค้นหากฏหมาย
              </h1>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
