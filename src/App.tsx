import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { FC } from "react";
import Nav from "./main/nav";
import theme from "./theme";

const App: FC = function (props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Nav></Nav>
      </div>
    </ThemeProvider>
  );
};

export default App;
