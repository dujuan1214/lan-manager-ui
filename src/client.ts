export interface Host {
    name: string;
    ipAddr: string;
    macAddr: string;
    up: boolean;
}
class Client {
    readonly baseUrl = "/api/";

     fetchHosts(): Promise<Host[]> {
         const pro = fetch(this.baseUrl + "host").then(res => {
            return res.json()
        });
        return pro
    }

    async getDevice(macAddr): Promise<Host[]> {
        const resp = await fetch(this.baseUrl + `host/${macAddr}/wake`, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        const json = await resp.json();
        return json as Host[];
    }

    async del(macAddr): Promise<Host[]> {
        const resp = await fetch(this.baseUrl + `host/${macAddr}`, {
            method: 'delete'
        });
        const json = await resp.json();
        return json as Host[];
    }

    async setHost(obg): Promise<boolean> {
        const resp = await fetch(this.baseUrl + `host`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obg)
        });
        const json = await resp.json();
        return json as boolean;
    }

}


const client = new Client();

export default client
