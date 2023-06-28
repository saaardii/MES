import { createTheme } from "@mui/material/styles";

const themeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#AD2624",
    },
    secondary: {
      main: "#808080",
    },
  },
  typography: {
    fontFamily: "Ubuntu",
    fontSize: 18,
    button: {
      textTransform: "none",
    },
  },
};

export const theme = createTheme(themeOptions);
