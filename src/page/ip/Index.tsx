import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import LaptopIcon from "mdi-material-ui/Laptop";
import React, { FC, useEffect, useState } from "react";
import client, { Host } from "../../client";

const Index: FC = () => {
  // const param: Host = {
  //   ipAddr: "",
  //   macAddr: "",
  //   name: "",
  //   up: true,
  // };
  const [data, setData] = useState<Host[]>([]);
  async function addList() {
    const data = await client.scan([]);
    // console.log('data', data)
    setData(data.hosts);
  }
  useEffect(() => {
    addList().catch(console.error);
  }, []);

  return (
    <List>
      {data.map((row, index) => (
        <ListItem disabled button key={index}>
          <ListItemIcon>
            <LaptopIcon />
          </ListItemIcon>
          <ListItemText style={{ width: "35px" }} primary="111" />
          <ListItemText primary="444" />
        </ListItem>
      ))}
    </List>
    // <div style={{ textAlign: "center", marginTop: "5em" }}>

    //   <h4>输入计算机的名称:</h4>
    //   <TextField
    //     label="请输入IP地址"
    //     fullWidth
    //     variant="outlined"
    //     onChange={(e) => {
    //       param.ipAddr = e.target.value;
    //     }}
    //     style={{ width: "90%" }}
    //   />
    //   <br />
    //   <br />
    //   <TextField
    //     label="请输入MAC地址"
    //     fullWidth
    //     variant="outlined"
    //     onChange={(e) => {
    //       param.macAddr = e.target.value;
    //     }}
    //     style={{ width: "90%" }}
    //   />
    //   <br />
    //   <br />
    //   <TextField
    //     label="请输入名称"
    //     fullWidth
    //     variant="outlined"
    //     onChange={(e) => {
    //       param.name = e.target.value;
    //     }}
    //     style={{ width: "90%" }}
    //   />
    //   <br />
    //   <br />
    //   <Button
    //     variant="contained"
    //     onClick={() => {
    //      submit()
    //     }}
    //     color="primary"
    //   >
    //     添加
    //   </Button>
    // </div>
  );
};
export default Index;
