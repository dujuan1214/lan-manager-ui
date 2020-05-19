export interface Host {
  ipAddr: string;
  macAddr: string;
  name: string;
  up: boolean;
}

// class Client {
//     readonly baseUrl = "/api/";

//     async fetchHosts(): Promise<Host[]> {
//         const pro = await fetch(this.baseUrl + "host").then(res => {
//             return res.json()
//         });
//         return pro
//     }

//     async getDevice(macAddr): Promise<Host[]> {
//         const resp = await fetch(this.baseUrl + `host/${macAddr}/wake`, {
//             headers: {
//                 "Content-Type": "application/json"
//             },
//         });
//         const json = await resp.json();
//         return json as Host[];
//     }

//     async del(macAddr): Promise<Host[]> {
//         const resp = await fetch(this.baseUrl + `host/${macAddr}`, {
//             method: 'delete'
//         });
//         const json = await resp.json();
//         return json as Host[];
//     }

//     async setHost(obg): Promise<boolean> {
//         const resp = await fetch(this.baseUrl + `host`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(obg)
//         });
//         const json = await resp.json();
//         return json as boolean;
//     }


export interface Page {
  result: {
    count: number;
    rows: Host[];
  };
  status: string;
}

class Client {
  readonly baseUrl = "/api";
  /**
   * 请求列表
   */
  async list(): Promise<Page> {
    const resp = await fetch(this.baseUrl + "/host");
    const json = await resp.json();
    return json as Page;
  }
  /**
   * 请求详情
   * @param id 设备id
   */
  async index(id: string): Promise<Host> {
    const data = await fetch(this.baseUrl + "/global/device/" + id);
    const json = await data.json();
    return json as Host;
  }

  /**
   * 唤醒设备
   * @param id 设备id
   */
  async exit(id: string) {
    const res = await fetch(this.baseUrl + "/global/device/" + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state: true }),
    });
    const json = await res.json();
    return json as boolean;
  }

  async scan(host: Host) {
    const res = await fetch(this.baseUrl + "/host", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(host),
    });
    const json = await res.json();
    return json as boolean;
  }

  async getDevice(macAddr): Promise<Host[]> {
    const resp = await fetch(this.baseUrl + `host/${macAddr}/wake`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await resp.json();
    return json as Host[];
  }

  async del(macAddr): Promise<Host[]> {
    const resp = await fetch(this.baseUrl + `host/${macAddr}`, {
      method: "delete",
    });
    const json = await resp.json();
    return json as Host[];
  }

  async setHost(obg): Promise<boolean> {
    const resp = await fetch(this.baseUrl + `host`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obg),
    });
    const json = await resp.json();
    return json as boolean;
  }
}

const client = new Client();

export default client;
