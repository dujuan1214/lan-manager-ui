import useMockList from "../page/useMockList";

export interface Device {
  id: string;
  name: string;
  open: boolean;
  ip: string;
}

export async function fetchDevices(): Promise<Device[]> {
  const resp = await fetch("/api/host");
  const json = await resp.json();
  // return json as Device[];
  // const res = await useMockList(1);
  // console.log(Window.sessionStorage);

  const obj = {};
  await fetch("/api/host", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  console.log(json);

  return json.array as Device[];
}
