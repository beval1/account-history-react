import { Box } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";


type Props = {
  onClick: () => void
};

function SearchButton(props: Props) {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.secondary.main,
      })}
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="80px"
      borderRadius="5px"
      component="button"
      onClick={props.onClick}
    >
      <SearchIcon color="primary" />
    </Box>
  );
}

export default SearchButton;
