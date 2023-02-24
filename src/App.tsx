import React from "react";
import "./App.css";
import {
  Box,
  Container,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import Header from "./layout/header/Header";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import theme from "./layout/theme/Theme";

function App() {
  const location = useLocation();
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StyledEngineProvider injectFirst>
            <Header></Header>
            {location.pathname === "/" ? (
              <Navigate to="/customer" replace={true} />
            ) : (
              <Container maxWidth="xl">
                <Box sx={{ margin: "50px 0px" }}>
                  <Outlet></Outlet>
                </Box>
              </Container>
            )}
        </StyledEngineProvider>
      </ThemeProvider>
    </Box>
  );
}

export default App;
