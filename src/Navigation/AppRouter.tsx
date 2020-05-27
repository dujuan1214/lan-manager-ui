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
import Search from "../page/home/Search";
import Ip from "../page/ip";
import { Mac } from "../page/mac";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      height: "100%",
    },
    btn: {
      height: "3em",
      backgroundColor: '#353535'
    },
    search: {
      height: "4em",
      backgroundColor: '#333333'
    },
    routers: {
      height: "calc(100% - 7em)",
      overflow: "auto",
    },
  }),
  {
    name: "AppRouter",
  },
);

const AppRouter: FC = () => {
  const classes = useStyles();
  return (
    <HashRouter>
      <Box height={1}>
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
