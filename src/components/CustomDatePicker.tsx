import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import React, { useState } from "react";
import StyledTextField from "./StyledTextField";

type Props = {
    label: String;
    onChange: React.Dispatch<React.SetStateAction<Date | null>>
};

function CustomDatePicker(props: Props) {
    const [value, setValue] = useState<Date|null>(null)
    // console.log(value)
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={props.label}
                onChange={(e) => {
                    props.onChange(e)
                    setValue(e)
                }}
                renderInput={(props) => (
                    <StyledTextField {...props}></StyledTextField>
                )}
                value={value}
            ></DatePicker>
        </LocalizationProvider>
    );
}

export default CustomDatePicker;
