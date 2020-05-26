import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import delay from "delay";
import RefreshIcon from "mdi-material-ui/Refresh";
import React, { FC, useEffect, useState } from "react";
import { browserHistory } from 'react-router';
import client, { Host } from "../../client";
import List from "./List";
import Search from "./Search";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
  },
  boxText: {
    position: "absolute",
    top: "1em",
    right: "4%",
  },
}));
const Index: FC = () => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [data, setData] = useState<Host[]>([]);
  async function load() {
    setLoading(true);
    await delay(500);
    const data = await client.list();
    setLoading(false);
    setData(data);
  }

  useEffect(() => {
    load().catch(console.error);
  }, []);


  return (
    <div className={classes.root}>
      <Button
        color="primary"
        size="medium"
        onClick={() => load()}
        className={classes.boxText}
      >
        <RefreshIcon />
      </Button>
      {loading && <CircularProgress />}
      <List data={data} onRefresh={load} />
    </div>
  );
};
export default Index;
