export interface Device {
    name: string;
    ip: string;
    macAddr: string;
    online: boolean;
}

export async function fetchDevices(): Promise<Device[]> {
    // const resp = await fetch("/devices");
    // const json = await resp.json();
    // return json as Device[];
    return [];
}