import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import React from "react";
import StyledTextField from "./StyledTextField";

type Props = {
  label: String
};

function CustomDatePicker(props: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={props.label}
        onChange={() => console.log("changed")}
        renderInput={(props) => <StyledTextField {...props}></StyledTextField>}
        value={undefined}
      ></DatePicker>
    </LocalizationProvider>
  );
}

export default CustomDatePicker;
