import useMockList from "../page/useMockList";

export interface Device {
  id: string;
  name: string;
  open: boolean;
  ip: string;
}

export async function fetchDevices(): Promise<Device[]> {
  // const resp = await fetch("/devices");
  // const json = await resp.json();
  // return json as Device[];
  const res = await useMockList(1);
  console.log(res);

  return res.array as Device[];
}
