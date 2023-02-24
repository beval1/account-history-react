import { Box, Typography } from "@mui/material";
import React from "react";
import CustomDatePicker from "./CustomDatePicker";

type Props = {};

function CustomRangePicker(props: Props) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      gap="10px"
      alignItems="center"
      color="grey"
    >
      <CustomDatePicker label="startDate"/>
      <Typography component="p" fontSize="24px">
        —
      </Typography>
      <CustomDatePicker label="endDate"/>
    </Box>
  );
}

export default CustomRangePicker;
