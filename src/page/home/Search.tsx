import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { makeStyles } from "@material-ui/core/styles";
import MagnifyIcon from "mdi-material-ui/Magnify";
import React, { FC } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    marginLeft: "1.5em",
  },
  search: {
    width: "80%",
    height: "40px",
    marginTop: "0.8em",
  },
}));
const Nav: FC = function (props) {
  const classes = useStyles(props);
  return (
    <nav className={classes.root}>
      <OutlinedInput
        color="secondary"
        fullWidth
        placeholder="搜索"
        className={classes.search}
        endAdornment={
          <InputAdornment position="end">
            <IconButton>
              <MagnifyIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </nav>
  );
};
export default Nav;
