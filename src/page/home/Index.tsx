import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import delay from "delay";
import RefreshIcon from "mdi-material-ui/Refresh";
import React, { FC, useEffect, useState } from "react";
import { Device, fetchDevices } from "../../test/devices";
import List from "./List/List";
import Search from "./main/Search";

const Index: FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    await delay(1000);
    const devices = await fetchDevices();
    setLoading(false);
    setDevices(devices);
  }

  useEffect(() => {
    load().catch(console.error);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <Search />
      <Button color="primary" size="small" onClick={() => load()}><RefreshIcon /></Button>
      <List devices={devices} />
      {loading && (
        <span>
          <CircularProgress />
        </span>
      )}
    </div>
  );
};
export default Index;
