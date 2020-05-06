import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { FC } from "react";
import AppRoute from "./Navigation/AppRouter";
import theme from "./theme";

const App: FC = function (props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoute />
    </ThemeProvider>
  );
};

export default App;
