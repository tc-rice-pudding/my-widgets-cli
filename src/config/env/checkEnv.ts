/* eslint-disable import/extensions */
import envMap from './env';
import { isValidEnv } from './utils';
import baseUrl from './baseUr.json';
import kfBaseUrl from './kfBaseUrl.json';
/**
 * 根据环境跳转UAA
 * @param {*} env 打包环境
 */
export function authorized(env: any) {
  if (isValidEnv(env)) {
    window.location.href = `${envMap[env].sso}?redirect=${encodeURIComponent(
      window.location.href
    )}`;
    return;
  }
  throw new Error(`部署错误: ${JSON.stringify(import.meta.env.MODE)}`);
}
export function getBaseUrl(mode: string) {
  return baseUrl[mode];
}
export function getKfBaseUrl(mode: string) {
  return kfBaseUrl[mode];
}
