
/**
 * 主页组件
 */
import React, { FC, useState, useEffect } from "react";
import List from './List/List';
import Search from './main/Search';
import { Device, fetchDevices } from '../../test/devices';
import Button from '@material-ui/core/Button';
import delay from "delay";
import CircularProgress from '@material-ui/core/CircularProgress';


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
    }, [])

    return <div>
        <Search />
        <List devices={devices} />
        <Button onClick={() => load()}>Refresh</Button>
        {loading && <span><CircularProgress /></span>}
    </div>;
};
export default Index;