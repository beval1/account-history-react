import { AppBar, Box, Typography } from "@mui/material";
import { padding } from "@mui/system";
import React, { Component } from "react";

type Props = {};

function Header(props: Props) {
  return (
    <header>
      <AppBar
        sx={(theme) => ({
          backgroundColor: theme.palette.secondary.main,
          height: "70px",
        })}
        elevation={2}
        position="relative"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Box component="img" src="trading212.png" height="50px" margin="6px 5px"></Box>
            <Box component="img" src="trading212-text.png" height="60px" margin="6px 5px"></Box>
            {/* <Typography
              component="a"
              fontSize="24px"
              sx={{ position: "relative", bottom: "0" }}
              noWrap
            >
              TRADING212
            </Typography> */}
          </Box>
          <Box display="flex" gap="40px" marginRight="30px">
            <Typography
              component="a"
              fontSize="24px"
              color="white"
              sx={{ position: "relative", bottom: "0" }}
              noWrap
            >
              CUSTOMERS
            </Typography>
            <Typography
              component="a"
              fontSize="24px"
              color="white"
              sx={{ position: "relative", bottom: "0" }}
              noWrap
            >
              EVENTS
            </Typography>
            <Typography
              component="a"
              fontSize="24px"
              color="white"
              sx={{ position: "relative", bottom: "0" }}
              noWrap
            >
              ACTORS
            </Typography>
          </Box>
        </Box>
      </AppBar>
    </header>
  );
}

export default Header;
