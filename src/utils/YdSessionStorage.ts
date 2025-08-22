/*
 * @Description:  存储session方法
 * @Author: djq
 * @Date: 2023-03-21 11:11:17
 * @LastEditTime: 2023-03-21 11:13:54
 * @LastEditors: djq
 */
import { Decrypt, Encrypt } from "./encrypt";
const setItem = function (key: string, value: any) {
  if (value && value !== "" && value !== "undefind") {
    // value = Encrypt(value);
  }
  sessionStorage.setItem(key, value);
};

const getItem = function (key: string) {
  let value = sessionStorage.getItem(key);
  if (value && value !== "" && value !== "undefind") {
    try {
      // let _val = Decrypt(value);
      // value = _val;
    } catch (error) {
      // console.log("getSessions error", error);
    }
  }
  return value;
};

const YdSessionStorage = {
  setItem,
  getItem,
};
export default YdSessionStorage;
