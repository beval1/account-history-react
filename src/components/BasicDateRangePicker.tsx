import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { DateRange, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { Moment } from "moment";
import { alpha } from "@mui/material";

export default function BasicDateRangePicker() {
  const [value, setValue] = React.useState<DateRange<Moment>>([null, null]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        localeText={{ start: "StartDate", end: "EndDate" }}
        sx={(theme) => ({
          "& .MuiDateRangePicker": {
            border: "1px solid #e2e2e1",
            overflow: "hidden",
            borderRadius: 4,
            backgroundColor: "#fcfcfb",
            transition: theme.transitions.create([
              "border-color",
              "background-color",
              "box-shadow",
            ]),
            "&:hover": {
              boxShadow: `${alpha(theme.palette.info.main, 0.25)} 0 0 0 2px`,
              borderColor: theme.palette.info.main,
            },
            "&.Mui-focused": {
              boxShadow: `${alpha(theme.palette.info.main, 0.25)} 0 0 0 2px`,
              borderColor: theme.palette.info.main,
            },
          },
          "& label.Mui-focused": {
            color: "grey",
          },
        })}
      />
    </LocalizationProvider>
  );
}
