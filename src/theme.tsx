import { blue, green, red } from "@material-ui/core/colors";
import { createMuiTheme, Theme } from "@material-ui/core/styles";

const theme: Theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: blue,
    secondary: green,
    error: red,
  },
  typography: {
    fontFamily: '"Microsoft YaHei", Roboto, Arial, sans-serif;',
  },
  overrides: {},
});

export default theme;
