import React, { createContext, useState } from "react";
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

type NavigationMenuContextType = {
	tab: number,
	setTab: React.Dispatch<
		React.SetStateAction<number>
	>;
};
export const NavigationMenuContext = createContext<NavigationMenuContextType>({} as NavigationMenuContextType);

function App() {
  const location = useLocation();
  const [tab, setTab] = useState<number>(0);
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StyledEngineProvider injectFirst>
          <NavigationMenuContext.Provider value={{ tab, setTab }}>
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
            </NavigationMenuContext.Provider>
        </StyledEngineProvider>
      </ThemeProvider>
    </Box>
  );
}

export default App;
