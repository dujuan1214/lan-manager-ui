import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import delay from "delay";
import RefreshIcon from "mdi-material-ui/Refresh";
import React, { FC, useEffect, useState } from "react";
import { browserHistory } from "react-router";
import client, { Host } from "../../client";
import List from "./List";
import Search from "./Search";

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
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [data, setData] = useState<Host[]>([]);
  async function load(text: string = "") {
    setLoading(true);
    const res = await client.list();
    setLoading(false);
    const sortData = res.sort(
      (a: any, b: any) =>
        a.ipAddr.replace(/\./g, "") - b.ipAddr.replace(/\./g, ""),
    );
    let findDatas: Host[] = [];
    if (text) {
      const findData = sortData.find((i) => i.ipAddr === text);
      if (findData) {
        findDatas = [findData];
      } else {
        findDatas = [];
      }
    } else {
      findDatas = sortData;
    }
    setData(findDatas);
  }
  useEffect(() => {
    load().catch(console.error);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <Search onSearch={(text) => load(text)} onReload={() => load()} />
      </div>

      {/* <Button
        color="primary"
        size="medium"
        onClick={() => load()}
        className={classes.boxText}
      >
        <RefreshIcon />
      </Button> */}

      <div className={classes.boxText}>
        <List data={data} onRefresh={load} />
        <div className={classes.loadings}>
          {loading && <CircularProgress />}
        </div>
      </div>
    </div>
  );
};
export default Index;
