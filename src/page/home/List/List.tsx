import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
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
  root: {},
  box: {
    width: '200px',
    height: '50px',
    lineHeight: '50px',
  }
}));
function createData(name, status, open) {
  return { name, status, open };
}

const List: FC<{ devices: Device[] }> = function (props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<Device[]>([]);
  useEffect(() => {
    setList(props.devices);
  }, [props.devices]);
  const listChange = (e, index) => {
    const cope = [...props.devices];
    cope[index].open = e.target.checked;
    setList(cope);
  };
  const [obg, setObg] = useState<any>({});
  return (
    <MyList>
      {list.map((row, index) => (
        <ListItem key={row.id} onClick={() => {
          setOpen(true);
          setObg(row);
        }} >
          <ListItemIcon>
            <LaptopIcon />
          </ListItemIcon>
          <ListItemText primary={row.name} />
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
      <Dialog maxWidth='xl' open={open} onClose={() => setOpen(false)}>
        <DialogTitle style={{ textAlign: 'center' }}>属性</DialogTitle>
        <MyList style={{ minWidth: '260px' }}>
          <ListItem>
            <ListItemText primary='id:' />
            <ListItemSecondaryAction>{obg.id}</ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary='ip地址:' />
            <ListItemSecondaryAction>{obg.ip}</ListItemSecondaryAction>
          </ListItem>

        </MyList>
      </Dialog>
    </MyList>
  );
};
export default List;
