import Button from "@material-ui/core/Button";
// import MonitorIcon from "mdi-material-ui/Monitor";
import TextField from "@material-ui/core/TextField";
import React, { FC } from "react";

const Index: FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "5em" }}>
      <h3>登录设置:</h3>
      <h4>输入计算机的名称:</h4>
      <TextField
        label="请输入IP地址"
        fullWidth
        variant="outlined"
        style={{ width: "90%" }}
      />
      <br />
      <br />
      <TextField
        label="请输入MAC地址"
        fullWidth
        variant="outlined"
        style={{ width: "90%" }}
      />
      <br />
      <br />
      <Button variant="contained" color="primary">
        唤醒
      </Button>
    </div>
  );
};
export default Index;
