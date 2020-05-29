import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import MyList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import LaptopIcon from "mdi-material-ui/Laptop";
import React, { FC, useEffect, useState } from "react";
import client, { Host } from "../../client";
import { ToastUtil } from "../../components/Toast";
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
      ToastUtil.success("已成功唤醒");
    }
  }
  async function deletes(macAddr: string) {
    const res = await client.del(macAddr);
    if (res) {
      props.onRefresh();
      setOpen(false);
      ToastUtil.success("已成功删除");
    }
  }

  return (
    <div>
      <MyList>
        {props.data.map((row, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              <LaptopIcon />
            </ListItemIcon>
            <ListItemText
              style={{ width: "35px" }}
              primary={row.name}
              secondary={row.up ? "true" : "false"}
            />
            <ListItemText primary={row.ipAddr} secondary={row.macAddr} />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                wakeList(row.macAddr);
              }}
            >
              唤醒
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setOpen(true);
                setObg(row);
              }}
            >
              删除
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
                onClick={() => {
                  deletes(obg.macAddr);
                }}
              >
                删除
              </Button>
            </div>
          </MyList>
        </Dialog>
      </MyList>
    </div>
  );
};
export default List;
