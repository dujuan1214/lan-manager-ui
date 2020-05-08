import useMockList from "../page/useMockList";

export interface Device {
  id: string;
  name: string;
  open: boolean;
}

export async function fetchDevices(): Promise<Device[]> {
  // const resp = await fetch("/devices");
  // const json = await resp.json();
  // return json as Device[];
  const res = await useMockList(1);

  return res.array as Device[];
}
