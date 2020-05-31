import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { makeStyles } from "@material-ui/core/styles";
import MagnifyIcon from "mdi-material-ui/Magnify";
import RefreshIcon from "mdi-material-ui/Refresh";
import React, { FC, useState } from "react";

interface NavProps {
  onReload: () => void;
  onSearch: (text: string) => void;
}
const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    marginLeft: "1.5em",
    backgroundColor: "#333333",
  },
  search: {
    width: "80%",
    height: "40px",
    marginTop: "0.8em",
  },
}));
const Nav: FC<NavProps> = function (props) {
  const [text, setText] = useState("");
  const classes = useStyles(props);
  return (
    <nav className={classes.root}>
      <OutlinedInput
        color="secondary"
        fullWidth
        placeholder="搜索"
        className={classes.search}
        onChange={(e) => setText(e.target.value)}
        endAdornment={
          <InputAdornment position="end" onClick={() => props.onSearch(text)}>
            <IconButton>
              <MagnifyIcon />
            </IconButton>
          </InputAdornment>
        }
      />
      <Button onClick={() => props.onReload()} color="primary" size="medium">
        <RefreshIcon />
      </Button>
    </nav>
  );
};
export default Nav;
