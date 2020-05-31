export interface Host {
  ipAddr: string;
  macAddr: string;
  name: string;
  up: boolean;
  type?: boolean;
  request?: boolean;
  chec?: boolean;
}

export interface Addresse {
  addr: string;
  addrtype: string;
  vendor: string;
}

export interface Statu {
  reason: string;
  reason_ttl: number;
  state: string;
}

export interface Hosts {
  addresses: Addresse[];
  status: Statu;
  up?: boolean;
}

export interface RootObject {
  hosts: Hosts[];
}

class Client {
  readonly baseUrl = "/api";
  /**
   * 显示列表
   */
  async list(): Promise<Host[]> {
    const resp = await fetch(this.baseUrl + "/host");
    const json = await resp.json();
    return json as Host[];
  }

  /**
   *
   * @param host
   * IP添加列表
   */
  async addList(host: Host): Promise<Host[]> {
    const res = await fetch(this.baseUrl + "/host", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(host),
    });
    const json = await res.json();
    return json as Host[];
  }

  /**
   *
   * @param host
   * IP扫描列表
   */
  async scan(ipArr: string[]): Promise<RootObject> {
    const res = await fetch(this.baseUrl + "/scan", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ipArr),
    });
    const json = await res.json();
    return json as RootObject;
  }

  /**
   *
   * @param macAddr
   * 删除设备
   */
  async del(macAddr: string): Promise<boolean> {
    const res = await fetch(this.baseUrl + `/host/${macAddr}`, {
      method: "delete",
    });
    const json = await res.json();
    console.log(json);
    return json as boolean;
  }

  /**
   *
   * @param macAddr
   * 唤醒设备
   */
  async wake(macAddr: string): Promise<boolean> {
    const res = await fetch(this.baseUrl + `/host/${macAddr}/wake`);
    const json = await res.json();
    return json as boolean;
  }
}

const client = new Client();

export default client;
