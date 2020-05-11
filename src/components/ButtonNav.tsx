import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from '@material-ui/core/styles';
import CastIcon from "mdi-material-ui/Cast";
import IpIcon from "mdi-material-ui/Ip";
import RemoteDesktopIcon from "mdi-material-ui/RemoteDesktop";
import React, { FC } from 'react';
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: "100%",
        display: 'flex',
        justifyContent: 'space-around'
    },
});

const ButtonNav: FC = (props) => {
    const classes = useStyles();




    return (

        <div className={classes.root}>
            <NavLink to="/">
                <BottomNavigationAction label="Home" icon={<CastIcon />} />
            </NavLink>
            <NavLink to="/ip">
                <BottomNavigationAction label="Nearby" icon={<IpIcon />} />
            </NavLink>
            <NavLink to="/mac">
                <BottomNavigationAction label="User" icon={<RemoteDesktopIcon />} />
            </NavLink>
        </div>);
};


export default ButtonNav;