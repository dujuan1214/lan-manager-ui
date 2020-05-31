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
    root: {},
    btn: {
      flex: " 0 0 30px",
      backgroundColor: "#353535",
    },

    routers: {
      flex: 1,
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
      <Box style={{ display: "flex", flexDirection: "column" }} height={1}>
        {/* <div className={classes.search}>
          <Search />
        </div> */}
        <Box height={1} className={classes.routers}>
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
