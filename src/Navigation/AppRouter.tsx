import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import CastIcon from "mdi-material-ui/Cast";
import IpIcon from "mdi-material-ui/Ip";
import RemoteDesktopIcon from "mdi-material-ui/RemoteDesktop";
import React, { FC } from "react";
import { HashRouter, NavLink, Route, Routes } from "react-router-dom";
import Home from "../page/home";
import Ip from "../page/ip";
import Mac from "../page/mac";

const useStyles = makeStyles((theme) => ({
  root: {},
  contexts: {
    height: "3em",
    textAlign: "center",
  },
}));

const AppRouter: FC = () => {
  const classes = useStyles();
  return (
    <HashRouter className={classes.root}>
      <Box height="100%">
        <Box p={1}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/ip" element={<Ip />}></Route>
            <Route path="/mac" element={<Mac />}></Route>
          </Routes>
        </Box>
        <nav className={classes.contexts}>
          <NavLink to="/">
            <CastIcon />
          </NavLink>
          <NavLink to="/ip">
            <IpIcon />
          </NavLink>
          <NavLink to="/mac">
            <RemoteDesktopIcon />
          </NavLink>
        </nav>
      </Box>
    </HashRouter>
  );
};
export default AppRouter;
