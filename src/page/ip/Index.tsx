import Button from "@material-ui/core/Button";
// import MonitorIcon from "mdi-material-ui/Monitor";
import TextField from "@material-ui/core/TextField";
import React, { FC } from "react";
import client, { Host } from "../../client";

const Index: FC = () => {
  const param: Host = {
    ipAddr: "",
    macAddr: "",
    name: "",
    up: true,
  };
  return (
    <div style={{ textAlign: "center", marginTop: "5em" }}>
      <h3>登录设置:</h3>
      <h4>输入计算机的名称:</h4>
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
          client.scan(param);
        }}
        color="primary"
      >
        唤醒
      </Button>
    </div>
  );
};
export default Index;
