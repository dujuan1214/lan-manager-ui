import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import LaptopIcon from "mdi-material-ui/Laptop";
import React, { FC, useEffect, useState } from "react";
import client, { Host, Hosts } from "../../client";

const Index: FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [obg, setObg] = useState<Host>({
    ipAddr: "",
    macAddr: "",
    name: "",
    up: true,
    type: false,
  });
  const [data, setData] = useState<Hosts[]>([]);
  async function scanList() {
    setLoading(true);
    const data = await client.scan([]);
    setData(data.hosts);
    setLoading(false);
  }
  async function submit() {
    const res = await client.addList(obg);
  }
  useEffect(() => {
    scanList().catch(console.error);
  }, []);

  return (
    <List style={{ textAlign: "center" }}>
      <Button
        onClick={() => {
          setOpen(true);
          setObg({
            ipAddr: "",
            macAddr: "",
            name: "",
            up: true,
            type: false,
          });
        }}
      >
        新增
      </Button>
      {data.map((row, i) => (
        <ListItem button key={i}>
          <ListItemIcon>
            <LaptopIcon />
          </ListItemIcon>
          <ListItemText
            style={{ width: "35px" }}
            primary={row.addresses[0].addrtype}
          />
          <ListItemText primary={row.addresses[0].addr} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpen(true);
              setObg({
                ipAddr: row.addresses[0].addr,
                macAddr: row.addresses[1].addr,
                name: "",
                up: true,
                type: true,
              });
            }}
          >
            操作
          </Button>
        </ListItem>
      ))}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>输入计算机的名称:</DialogTitle>
        <div style={{ textAlign: "center" }}>
          <TextField
            label="请输入IP地址"
            fullWidth
            disabled={obg.type}
            variant="outlined"
            defaultValue={obg.ipAddr}
            onChange={(e) => {
              setObg((state) => {
                state.ipAddr = e.target.value;
                return state;
              });
            }}
            style={{ width: "90%" }}
          />
          <br />
          <br />
          <TextField
            label="请输入MAC地址"
            disabled={obg.type}
            fullWidth
            variant="outlined"
            defaultValue={obg.macAddr}
            onChange={(e) => {
              setObg((state) => {
                state.macAddr = e.target.value;
                return state;
              });
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
              setObg((state) => {
                state.name = e.target.value;
                return state;
              });
            }}
            style={{ width: "90%" }}
          />
          <br />
          <br />
          <Button
            variant="contained"
            onClick={() => {
              if (obg.ipAddr && obg.macAddr) {
                submit();
              } else {
                alert("请输入ip或者mac");
              }
            }}
            color="primary"
          >
            添加
          </Button>
        </div>
      </Dialog>
      {loading && <CircularProgress />}
    </List>
  );
};
export default Index;
