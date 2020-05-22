import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
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
import { Mac } from "../page/mac";
import Search from "../page/home/main/Search";

const useStyles = makeStyles((theme) => ({
  root: {},
  btn: {
    height: "3em",
  },
  search: {
    height: "4em",
  },
  routers: {
    height: "calc(100vh - 7em)",
    overflow: "auto"
  },
}));

const AppRouter: FC = () => {
  const classes = useStyles();
  return (
    <HashRouter>
      <Box>
        <div className={classes.search}>
          <Search />
        </div>
        <Box className={classes.routers}>
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
