import Button from "@material-ui/core/Button";
// import Alert from '@material-ui/lab/Alert';
import CircularProgress from "@material-ui/core/CircularProgress";
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
import client, { Host } from "../../../client";
import Toast from "../../../components/Toast";
const useStyles = makeStyles((theme) => ({
  root: {},
  box: {
    width: "200px",
    height: "50px",
    lineHeight: "50px",
  },
  btn: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

const List: FC<{ data: Host[]; onRefresh: any }> = function (props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [obg, setObg] = useState<Host>({
    ipAddr: "",
    macAddr: "",
    name: "",
    up: false,
  });
  async function wakeList(macAddr: string) {
    const wakes = await client.wake(macAddr);
    if (wakes) {
      props.onRefresh();
      setOpen(false);

      alert("已成功唤醒");
    }
  }
  async function deletes(macAddr: string) {
    const res = await client.del(macAddr);
    if (res) {
      props.onRefresh();
      setOpen(false);
      alert("已成功删除");
    }
  }

  return (
    <MyList>
      {props.data.map((row, index) => (
        <ListItem button key={index}>
          <ListItemIcon>
            <LaptopIcon />
          </ListItemIcon>
          <ListItemText style={{ width: "35px" }} primary={row.name} />
          <ListItemText primary={row.up ? "已唤醒" : "未唤醒"} />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setOpen(true);
              setObg(row);
            }}
          >
            操作
          </Button>
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
            <Button
              variant="outlined"
              color="secondary"
              onClick={(e) => {
                () => {
                  wakeList(obg.macAddr);
                };
              }}
            >
              唤醒
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                deletes(obg.macAddr);
              }}
            >
              删除
            </Button>
          </div>
        </MyList>
      </Dialog>
      {/* <Alert variant="outlined" severity="success">已成功唤醒</Alert>
      <Alert variant="outlined" severity="error">
        已成功删除
      </Alert> */}
    </MyList>
  );
};
export default List;
