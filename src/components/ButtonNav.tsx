import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import CastIcon from "mdi-material-ui/Cast";
import IpIcon from "mdi-material-ui/Ip";
import RemoteDesktopIcon from "mdi-material-ui/RemoteDesktop";
import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import NavLinkButton from '../NavLinkButton';
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
  button: {
    "&.active": {
      backgroundColor: 'rgba(38,103,152,0.3)',

    }
  },
}), {
  name: "ButtonNav"
});

const ButtonNav: FC = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavLinkButton to="/" className={classes.button}>
        <CastIcon />
      </NavLinkButton>
      <NavLinkButton to="/ip" className={classes.button}>
        <IpIcon />
      </NavLinkButton>
      <NavLinkButton to="/mac" className={classes.button}>
        <RemoteDesktopIcon />
      </NavLinkButton>
    </div>
  );
};

export default ButtonNav;
