import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import delay from "delay";
import RefreshIcon from "mdi-material-ui/Refresh";
import React, { FC, useEffect, useState } from "react";
import client, { Host, Page } from "../../client";
import List from "./List/List";
import Search from "./main/Search";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    position: "relative",
  },
  boxWrop: {
    width: "100%",
    height: "4em",
    display: "fixed",
  },
  boxText: {
    position: "absolute",
    top: "1em",
    right: "4%",
  },
}));
const Index: FC = () => {
  // const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [data, setData] = useState<Host[]>([]);

  async function load() {
    setLoading(true);
    await delay(1000);
    const data = await client.list();
    setLoading(false);
    setData(data);
  }

  const test = () => {
    client.setHost({});
  };

  useEffect(() => {
    load().catch(console.error);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.boxWrop}>
        <Search />
        <Button
          color="primary"
          size="medium"
          onClick={() => load()}
          className={classes.boxText}
        >
          <RefreshIcon />
        </Button>
      </div>
      <List data={data} />
      {loading && (
        <span>
          <CircularProgress />
        </span>
      )}
    </div>
  );
};
export default Index;
