import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { createHashHistory } from "history";
import React, { FC } from "react";
import AppRoute from "./Navigation/AppRouter";
import theme from "./theme";

const App: FC = function (props) {
  // const history = createHashHistory();
  // console.log(history);

  // history.listen(() => {
  //   console.log(22222);
  // });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoute />
    </ThemeProvider>
  );
};

export default App;
