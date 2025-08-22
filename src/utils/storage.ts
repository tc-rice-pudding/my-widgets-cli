/**
 * 对localStorage信息进去存取
 */

export const getItem = (name: string) => {
  const data = window.sessionStorage.getItem(name) as any;
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

export const setItem = (name: string, value: any) => {
  let values = "";
  if (typeof value === "object") {
    values = JSON.stringify(value);
  } else {
    values = value;
  }
  window.sessionStorage.setItem(name, values);
};

export const removeItem = (name: string) => {
  window.sessionStorage.removeItem(name);
};

export const setLocalStorage = (name: string, value: any) => {
  let values = "";
  if (typeof value === "object") {
    values = JSON.stringify(value);
  } else {
    values = value;
  }
  window.localStorage.setItem(name, values);
};

export const getLocalStorage = (name: string) => {
  if (!name) return "";
  return window.localStorage.getItem(name);
};

export const removeLocalStorage = (name: string) => {
  window.localStorage.removeItem(name);
};

/**
 * 添加cookie
 * @param cname 名称
 * @param value 值
 * @param exdays 失效时间
 */
export const setCookie = (
  cname: string,
  value: any,
  domain?: string,
  exDays = 1
) => {
  const d = new Date();
  d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${value};${expires};path=/;domain=${domain}`;
};

/**
 * 获取cookie
 * @param XName 名称
 */
export const getCookie = (cname: string) => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
