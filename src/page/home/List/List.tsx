import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import MyList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import LaptopIcon from "mdi-material-ui/Laptop";
import React, { FC, useEffect, useState } from "react";
import client, { Host } from '../../../client';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {},
  box: {
    width: "200px",
    height: "50px",
    lineHeight: "50px",
  },
  btn: {
    display: 'flex',
    justifyContent: 'space-around'
  }
}));
// function createData(name, status, open) {
//   return { name, status, open };
// }


const List: FC<{ data: Host[] }> = function (props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<Host[]>([]);
  useEffect(() => {
    setList(props.data);
  }, [props.data]);
  const listChange = (e, index) => {
    const cope = [...props.data];
    cope[index].up = e.target.checked;
    setList(cope);
  };
  const [obg, setObg] = useState<any>({});
  /**
   * 唤醒
   */
  const huanxing = () => {
    setOpen(false)

    let time = setTimeout(async () => {
      try {
        let data = await client.getDevice(obg.macAddr)

        if (data.up) {
          clearTimeout(time);
        }
      } catch (err) {
        console.log(err);

      }
    }, 5000)

  }

  return (
    <MyList>
      {list.map((row, index) => (
        <ListItem
          key={row.name}
          onClick={() => {
            setOpen(true);
            setObg(row);
          }}
        >
          <ListItemIcon>
            <LaptopIcon />
          </ListItemIcon>
          <ListItemText primary={row.name} />
          <ListItemText primary={row.up} />
        </ListItem>
      ))}
      <Dialog maxWidth="xl" open={open} onClose={() => setOpen(false)}>
        <DialogTitle style={{ textAlign: "center" }}>属性</DialogTitle>
        <MyList style={{ minWidth: "260px" }}>
          <ListItem>
            <ListItemText primary="mac地址:" />
            <ListItemSecondaryAction>{obg.macAddr}</ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="ip地址:" />
            <ListItemSecondaryAction>{obg.ipAddr}</ListItemSecondaryAction>
          </ListItem>
          <div className={classes.btn}>
            <Button variant="contained" onClick={huanxing} color='primary'>唤醒</Button>
            <Button variant="contained" color='primary'>操作</Button>
            <Button variant="contained" color='secondary'>删除</Button>
          </div>
        </MyList>
      </Dialog>
    </MyList>
  );
};
export default List;
