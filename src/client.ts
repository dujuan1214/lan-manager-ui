export interface Host {
  ipAddr: string;
  macAddr: string;
  name: string;
  up: boolean;
  type?: boolean;
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
    return json as boolean;
  }

  /**
   *
   * @param macAddr
   * 唤醒设备
   */
  async wake(macAddr: string): Promise<boolean> {
    const res = await fetch(`${this.baseUrl}/host/${macAddr}/wake`);
    const json = await res.json();
    return json as boolean;
  }
}

//   async index(id: string): Promise<Host> {
//     const data = await fetch(this.baseUrl + "get /api/host");
//     const json = await data.json();
//     return json as Host;
//   }

//   /**
//    * 唤醒设备
//    * @param id 设备id
//    */
//   async exit(id: string) {
//     const res = await fetch(this.baseUrl + "/global/device/" + id, {
//       method: "put",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ state: true }),
//     });
//     const json = await res.json();
//     return json as boolean;
//   }

//   async scan(host: Host) {
//     const res = await fetch(this.baseUrl + "/host", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(host),
//     });
//     const json = await res.json();
//     return json as boolean;
//   }

//   async getDevice(macAddr): Promise<Host[]> {
//     const resp = await fetch(this.baseUrl + `host/${macAddr}/wake`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const json = await resp.json();
//     return json as Host[];
//   }

//   async del(macAddr): Promise<Host[]> {
//     const resp = await fetch(this.baseUrl + `host/${macAddr}`, {
//       method: "delete",
//     });
//     const json = await resp.json();
//     return json as Host[];
//   }

//   async setHost(obg): Promise<boolean> {
//     const resp = await fetch(this.baseUrl + `host`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(obg),
//     });
//     const json = await resp.json();
//     return json as boolean;
//   }
// }

const client = new Client();

export default client;
