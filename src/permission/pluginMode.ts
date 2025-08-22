/*
 * @Author: zxin
 * @Date: 2024-11-18 18:18:10
 * @LastEditors: zxin
 * @LastEditTime: 2024-11-18 23:13:10
 * @FilePath: \cli-vue3-admin\src\permission\pluginMode.ts
 * @Description: 
 */
import { useApp } from "@/pinia/modules/app";

const pluginTokenMap = (window as any)?.globalConstant?.pluginTokenMap ?? {};
const pluginTokenResources =
  (window as any)?.globalConstant?.pluginTokenResources ?? "";

export const getPluginToken = () => {
  return new Promise((resolve) => {
    if (!pluginTokenResources) resolve(true);
    const { setAppAndUserToken } = useApp();
    try {
      const request = new XMLHttpRequest();
      request.open("GET", pluginTokenResources, true);
      request.onload = () => {
        const obj = parseHeaders(request.getAllResponseHeaders());
        const data = {};
        for (const key in pluginTokenMap) {
          if (obj[key]) {
            data[pluginTokenMap[key]] = obj[key];
          }
        }
        setAppAndUserToken(data);
        resolve(true);
      };
      request.send();
    } catch (error) {
      resolve(false);
    }
  });
};

const parseHeaders = (headers) => {
  const parsed = {};
  headers.split("\r\n").forEach((line) => {
    const [key, value] = line.split(": ");
    if (key) parsed[key.trim()] = value && value.trim();
  });
  return parsed;
};
