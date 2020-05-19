import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import CastIcon from "mdi-material-ui/Cast";
import IpIcon from "mdi-material-ui/Ip";
import RemoteDesktopIcon from "mdi-material-ui/RemoteDesktop";
import React, { FC, useEffect } from "react";
import {
  HashRouter,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import ButtonNav from "../components/ButtonNav";
import Home from "../page/home";
import Ip from "../page/ip";
import Mac from "../page/mac";

const useStyles = makeStyles((theme) => ({
  root: {},
  btn: {
    height: "50px",
  },
}));

const AppRouter: FC = () => {
  const classes = useStyles();
  return (
    <HashRouter>
      <Box>
        <Box style={{ height: "calc(100vh - 50px)", overflow: "auto" }}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/ip" element={<Ip />}></Route>
            <Route path="/mac" element={<Mac />}></Route>
          </Routes>
        </Box>
        <nav className={classes.btn}>
          <ButtonNav />
        </nav>
      </Box>
    </HashRouter>
  );
};
export default AppRouter;
