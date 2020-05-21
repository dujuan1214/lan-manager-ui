import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import LaptopIcon from "mdi-material-ui/Laptop";
import React, { FC, useEffect, useState } from "react";
import client, { Host } from "../../client";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from '@material-ui/core/DialogTitle';

const Index: FC = () => {
  const param: Host = {
    ipAddr: "",
    macAddr: "",
    name: "",
    up: true,
  };
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Host[]>([]);
  async function scanList() {
    const data = await client.scan([]);
    console.log('data', data.hosts[0].addresses)
    setData(data.hosts[0].addresses);
  }
  async function submit() {
    const res = await client.addList(param);

  }
  useEffect(() => {
    scanList().catch(console.error);
    submit().catch(console.error);
  }, []);

  return (
    <List>
      {data.map((row, i) => (
        <ListItem button key={i} onClick={() => {
          setOpen(true);
        }}>
          <ListItemIcon>
            <LaptopIcon />
          </ListItemIcon>
          <ListItemText style={{ width: "35px" }} primary={data.addr} />
          <ListItemText primary={data.addrtype} />
          <Button variant="contained" color="primary">
            操作
          </Button>
        </ListItem>
      ))
      }
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>输入计算机的名称:</DialogTitle>
        <div style={{ textAlign: "center" }}>
          <TextField
            label="请输入IP地址"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              param.ipAddr = e.target.value;
            }}
            style={{ width: "90%" }}
          />
          <br />
          <br />
          <TextField
            label="请输入MAC地址"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              param.macAddr = e.target.value;
            }}
            style={{ width: "90%" }}
          />
          <br />
          <br />
          <TextField
            label="请输入名称"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              param.name = e.target.value;
            }}
            style={{ width: "90%" }}
          />
          <br />
          <br />
          <Button
            variant="contained"
            onClick={() => {
              submit()
            }}
            color="primary"
          >
            添加
        </Button>
        </div>
      </Dialog>

    </List >

  );
};
export default Index;
