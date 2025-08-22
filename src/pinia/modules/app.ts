/*
 * @Descripttion:
 * @version:
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: zxin
 * @LastEditTime: 2024-11-18 23:26:45
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
 */

import { defineStore } from "pinia";
import { getItem, setItem, removeItem } from "@/utils/storage"; //getItem和setItem是封装的操作localStorage的方法
// import { AesEncryption } from '@/utils/encrypt'
import auth from "@/utils/token";
import { useAccount } from "./account";
import { useTags } from "./tags";
import { useMenus } from "./menu";
export const TOKEN = "UPMS-TOKEN";
const COLLAPSE = "UPMS-COLLAPSE";
const webTitle = (window as any).globalConstant.webTitle;
interface AppState {
  title: string;
  sidebar: {
    collapse: any;
  };
  authorization: string;
  appToken: string;
  device: string;
}

export const useApp = defineStore("app", {
  state: (): AppState => ({
    title: webTitle || "统一登录管理平台",
    authorization: "",
    appToken: '',
    sidebar: {
      collapse: (getItem(COLLAPSE) || false) as any,
    },
    device: "desktop",
  }),
  actions: {
    setCollapse(data) {
      this.sidebar.collapse = data;
      // 保存到localStorage
      setItem(COLLAPSE, data);
    },
    clearCollapse() {
      this.sidebar.collapse = "";
      removeItem(COLLAPSE);
    },
    setDevice(device) {
      this.device = device;
    },
    setAppAndUserToken({ userToken, appToken }) {
      this.authorization = userToken;
      this.appToken = appToken;
    },
    setToken(data) {
      this.authorization = data;
      // 保存到localStorage
      auth.setToken(data);
    },
    initToken(data) {
      this.clearToken();
      this.setToken(data);
    },
    clearToken() {
      // 清除token
      this.authorization = "";
      // removeItem(TOKEN);
      auth.removeToken();

      // 清除用户信息
      useAccount().clearUserinfo();
      // 清除标签栏
      useTags().clearAllTags();
      // 清空menus
      useMenus().setMenus([]);
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "app", //自定义 Key值
        paths: [COLLAPSE, "authorization", "appToken"],
        storage: localStorage, // 选择存储方式
      },
    ],
  },
});
