import { makeStyles, Snackbar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import LaptopIcon from "mdi-material-ui/Laptop";
import RefreshIcon from "mdi-material-ui/Refresh";
import React, { FC, useEffect, useState } from "react";
import client, { Host, Hosts } from "../../client";
import { ToastUtil } from "../../components/Toast";
import Search from "../home/Search";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  },
  search: {
    flex: "0 0 50px",
  },
  loadings: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  boxText: {
    overflow: "auto",
    flex: 1,
  },
}));
const Index: FC = () => {
  const classes = useStyles();
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
  async function scanList(load: boolean, text: string = "") {
    setLoading(true);
    const res = await client.list(); // arr1
    let sortData: Hosts[];
    if (load) {
      localStorage.removeItem("myCat");
      setData([]);
      const data = await client.scan([]); // arr2
      sortData = data.hosts.sort(
        (a: any, b: any) =>
          a.addresses[0].addr.replace(/\./g, "") -
          b.addresses[0].addr.replace(/\./g, ""),
      );
      localStorage.myCat = JSON.stringify(sortData);
    } else {
      if (localStorage.myCat) {
        sortData = JSON.parse(localStorage.myCat);
      } else {
        const data = await client.scan([]);
        sortData = data.hosts.sort(
          (a: any, b: any) =>
            a.addresses[0].addr.replace(/\./g, "") -
            b.addresses[0].addr.replace(/\./g, ""),
        );
        localStorage.myCat = JSON.stringify(sortData);
      }
    }
    const sortData1 = sortData.map((i) => {
      if (res.find((a) => a.ipAddr === i.addresses[0].addr)) {
        i.up = true;
      }
      return i;
    });
    let findDatas: Hosts[] = [];
    if (text) {
      const findData = sortData.find((i) => i.addresses[0].addr === text);
      if (findData) {
        findDatas = [findData];
      } else {
        findDatas = [];
      }
    } else {
      findDatas = sortData;
    }
    setData(findDatas);
    setLoading(false);
  }

  async function submit() {
    const res = await client.addList(obg);
    setOpen(false);
    ToastUtil.success("添加成功");
    scanList(true);
  }
  useEffect(() => {
    scanList(false).catch(console.error);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <Search
          onSearch={(text) => scanList(false, text)}
          onReload={() => scanList(true)}
        />
      </div>
      {/* <Button color="primary" size="medium" onClick={() => scanList(true)}>
        <RefreshIcon />
      </Button> */}
      <div className={classes.boxText}>
        <List>
          {data.map((row, i) => (
            <ListItem button key={i}>
              {/* disabled={row.up} */}
              <ListItemIcon>
                <LaptopIcon />
              </ListItemIcon>
              <ListItemText
                style={{ width: "35px" }}
                primary={row.addresses[0].addrtype}
              />
              <ListItemText
                primary={row.addresses[0].addr}
                secondary={row.up ? "已添加" : "未添加"}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setOpen(true);
                  setObg({
                    ipAddr: row.addresses[0].addr,
                    macAddr: row.addresses[1]?.addr,
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
          {/* <div>
        <Button  color="primary"  variant="contained"  onClick={() => {  setOpen(true);  setObg({    ipAddr: "",    macAddr: "",  name: "",  up: true,  type: false,    });  }}  >
          新增
      </Button>
      </div> */}
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
                    alert("请输入IP地址及MAC地址");
                  }
                }}
                color="primary"
              >
                添加
              </Button>
            </div>
          </Dialog>
        </List>
        <div className={classes.loadings}>
          {loading && <CircularProgress />}
        </div>
      </div>
    </div>
  );
};
export default Index;
