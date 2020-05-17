import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import CastIcon from "mdi-material-ui/Cast";
import IpIcon from "mdi-material-ui/Ip";
import RemoteDesktopIcon from "mdi-material-ui/RemoteDesktop";
import React, { FC } from "react";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
});

const ButtonNav: FC = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavLink to="/">
        <IconButton>
          <CastIcon />
        </IconButton>
      </NavLink>
      <NavLink to="/ip">
        <IconButton>
          <IpIcon />
        </IconButton>
      </NavLink>
      <NavLink to="/mac">
        <IconButton>
          <RemoteDesktopIcon />
        </IconButton>
      </NavLink>
    </div>
  );
};

export default ButtonNav;
