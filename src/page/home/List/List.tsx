import MyList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import LaptopIcon from "mdi-material-ui/Laptop";
import React, { FC, useEffect, useState } from "react";
import { Device } from "../../../test/devices";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.common.white,
    overflow: "hidden"
  },
}));
function createData(name, status, open) {
  return { name, status, open };
}

const List: FC<{ devices: Device[] }> = function (props) {
  const classes = useStyles();
  const [list, setList] = useState<Device[]>([]);
  useEffect(() => {
    setList(props.devices);
  }, [props.devices]);
  const listChange = (e, index) => {
    const cope = [...props.devices];
    cope[index].open = e.target.checked;
    setList(cope);
  };
  return (
    <MyList>
      {list.map((row, index) => (
        <ListItem key={row.id}>
          <ListItemIcon>
            <LaptopIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-wifi" primary={row.name} />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={row.open}
              onChange={(e) => {
                listChange(e, index);
              }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </MyList>
  );
};
export default List;
