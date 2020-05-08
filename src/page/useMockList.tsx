import { mock, Random } from "mockjs";
import React from "react";

interface Data {
  id: string;
  start: boolean;
  open: boolean;
  name: string;
  ip: string;
}

interface Device {
  array: Data[];
  page: number;
}

const getListData: (page: number) => Promise<any> = (page) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`第${page}页数据`);
      resolve(getData(page));
    }, 500);
  });
};

const getData: (page: number) => Device = (page) => {
  return mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    "array|100": [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        start: false,
        test: false,
        "id|+1": () => Random.id(),
        name: () => Random.cname(),
        "start|1-2": true,
        "test|1-2": true,
        ip: () => Random.ip(),
        open() {
          return this.start && this.test;
        },
      },
    ],
    page,
  });
};

export default getListData;
