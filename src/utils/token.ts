/*
 * @Description: 设置token
 * @Author: djq
 * @Date: 2023-03-21 11:26:55
 * @LastEditTime: 2023-03-21 11:55:08
 * @LastEditors: djq
 */
import YdSessionStorage from "./YdSessionStorage";
export const TOKEN = "UPMS-TOKEN"; // 常量
const setToken = (value: any) => YdSessionStorage.setItem(TOKEN, value);
const getToken = () => {
  try {
    return YdSessionStorage.getItem(TOKEN);
    // return JSON.parse(
    //   YdSessionStorage.getItem(TOKEN) || `{ "accessToken": '' }`
    // );
  } catch (error) {
    return "";
  }
};
/**
 *
 * @description  检查是否登录
 */
const isLogin = () => !!getToken();
const removeToken = () => sessionStorage.removeItem(TOKEN);
export default {
  setToken,
  getToken,
  removeToken,
  isLogin,
};
