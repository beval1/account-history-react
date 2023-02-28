import { Box, Typography } from "@mui/material";
import React from "react";
import CustomDatePicker from "./CustomDatePicker";

type Props = {
  onStartDateChange: React.Dispatch<React.SetStateAction<Date | null>>
  onEndDateChange: React.Dispatch<React.SetStateAction<Date | null>>
};

function CustomRangePicker(props: Props) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      gap="10px"
      alignItems="center"
      color="grey"
    >
      <CustomDatePicker label="startDate" onChange={props.onStartDateChange}/>
      <Typography component="p" fontSize="24px">
        —
      </Typography>
      <CustomDatePicker label="endDate" onChange={props.onEndDateChange}/>
    </Box>
  );
}

export default CustomRangePicker;
