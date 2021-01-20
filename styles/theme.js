import { createMuiTheme } from "@material-ui/core";
import { orange, green, red } from "@material-ui/core/colors";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: green[600],
    },
    error: {
      main: red[700],
    },
  },
  overrides: {
    MuiToolbar: {
      root: {
        color: "white",
      },
    },
  },
});

export default theme;
