import { styled } from "@mui/material/styles";
import {
  alpha,
  OutlinedInputProps,
  TextField,
  TextFieldProps,
} from "@mui/material";

const StyledTextField = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "white",
  "& .MuiFilledInput-root": {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#fcfcfb",
    // transition: theme.transitions.create([
    //   "border-color",
    //   "background-color",
    //   "box-shadow",
    // ]),
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
}));

export default StyledTextField;
