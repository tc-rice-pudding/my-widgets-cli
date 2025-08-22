import request from "@/utils/request";
import { getItem } from "@/utils/storage";
import { TOKEN } from "@/utils/token";
import { mapApiParams } from "@/utils/common";
const requestParams: string = (window as any).globalConstant.requestParams;

interface LoginParams<T> {
  username: string;
  password: string;
  captcha: string;
  uuid: T;
}
// 获取用户信息
export default {
  getUserMenu: (params: {}) => {
    return request.post<any>("/msg/gz-cloud/config/myMenu", params);
  },
  getUserInfo: () => {
    const params = {
      Authorization: getItem(TOKEN),
    };
    return request.post<any>("/msg/gz-cloud/user/myInfo", params);
  },
  aesEncode: (params) => {
    return request.post<any>("/api/user/aesEncode", params);
  },
  getAppByUserId: (params, type) => {
    params = mapParamsByType(params, type);
    return request.post<any>(`${requestParams}/common`, params);
  },
  authfactors: (params) => {
    return request.post<any>(
      `${requestParams}/user/query-app-auth-factors`,
      params
    );
  },

  //   {
  //     "queryId": "list-zt-user-app",
  //     "params": {
  //         "userId":"33"
  //     },
  //     "dbSource": "rcsDb",
  //     "type": "query"
  // }
};
// 登出
export const loginOut = () => {
  return request.post<any>("/gwkf/uaa/api/logout");
};

const mapParamsByType = (params: any, type: string) => {
  let data;
  switch (type) {
    case "list":
      data = mapApiParams({
        queryId: "list-zt-user-app",
        params,
        dbSource: "rcsDb",
        type: "query",
      });
      break;

    default:
      data = {};
  }
  return data;
};
