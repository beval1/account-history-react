import { createTheme } from "@mui/material";

const theme = createTheme({
	palette: {
		primary: {
			main: "#FFFFFF",
		},
		secondary: {
			main: "#00A2DA",
		},
		background: {
			// default: "#DAE0E6",
			default: "#F1F1F1"
		},
		// third: {
		// 	main: "#DAE0E6",
		// },
		mode: "light"
	},
});

export default theme;