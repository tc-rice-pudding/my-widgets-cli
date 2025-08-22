import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import { useApp } from "@/pinia/modules/app";
import { ERROR_CODE_MESSAGE } from "@/config/base";
// import { getBaseUrl, getKfBaseUrl, authorized } from '@/config/env/checkEnv';
import { BaseResponse } from "@/core/interface/response";
import auth from "@/utils/token";
import { useAccount } from "@/pinia/modules/account";
import router from "@/router";
import { Decrypt, Encrypt, matchString, excludeMatchString } from '@/utils/axiosEncrypt'
const baseURL = (window as any).globalConstant.baseUrl;

let showErrorMessage = true;
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  withCredentials: false, // 跨域请求是否携带cookie
});
const msgConfig = {
  duration: 2000,
};

// 拦截请求
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { authInfo } = useAccount();
    const { authorization } = useApp();
    const { language, appVersion, platform } = navigator;
    config.headers = {
      ...config.headers,
      Authorization: (authorization as any) || "",
      appToken: (authInfo && (authInfo.appToken as any)) || "",
      language,
      appVersion,
      terminalModel: platform,
    };
    // aes对请求体进行加密
    if((window as any).globalConstant.openHw110ReqEncrypt) {
      // 当前url是否是排除不加密的path
      if(!excludeMatchString((window as any).globalConstant.excludeAesPath, config.url)) {
        // 匹配reqEncryptPath配置的接口path（动态配置）
        if((window as any).globalConstant.reqEncryptPath && matchString((window as any).globalConstant.reqEncryptPath,config.url)) {
          try {
            config.data = {data: Encrypt(JSON.stringify(config.data))}
            config.headers['Content-Type'] = 'application/json';
          } catch (error) {

          }
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 拦截响应
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if((window as any).globalConstant.openHw110ResDecrypt) {
      // 当前url是否是排除不加密的path
      if(!excludeMatchString((window as any).globalConstant.excludeAesPath, response.config.url)) {
          // 匹配reqEncryptPath配置的接口path（动态配置）
          if((window as any).globalConstant.resDecryptPath && matchString((window as any).globalConstant.resDecryptPath,response.config.url)) {
            let ResData = response.data
            try {
              let aesData = Decrypt(ResData.data)
              response.data =  JSON.parse(aesData)
              console.log("接口返回值: ",ResData,response);
            } catch (error) {
            }
          }
      }
    }
    // 支持下载文件
    if (response.config.responseType) {
      if (response.status == 200) {
        return response;
      }
      return Promise.reject(response.data);
    }
    if (response.data.code == 200) {
      return response;
    }
    const { msg } = response.data;

    if (["65061"].includes(response.data.code)) {
      const { clearToken } = useApp();
      clearToken();
      if (showErrorMessage) {
        ElMessage.error({
          message: msg,
          duration: msgConfig.duration,
        });
        // authorized(import.meta.env.MODE);
        router.push("/login");
        showErrorMessage = false;
        setTimeout(() => {
          showErrorMessage = true;
        }, 3000);
        return Promise.reject(response.data);
      }
    } else {
      ElMessage.error({
        message: msg,
        duration: msgConfig.duration,
      });
      return Promise.reject(response.data);
    }

    // return response;
  },
  (error) => {
    console.log(error);

    const originalRequest = error.config;
    // 网络不可用
    if (error.message === "Network Error") {
      ElMessage.error({
        message: "网络不可用，请检查网络！！！",
        duration: msgConfig.duration,
      });
    } else if (
      error.code === "ECONNABORTED" &&
      error.message.indexOf("timeout") !== -1 &&
      // eslint-disable-next-line no-underscore-dangle
      !originalRequest._retry
    ) {
      ElMessage.error({
        message: "请求超时，请稍后重试！！！",
        duration: msgConfig.duration,
      });
    } else {
      const errorText =
        ERROR_CODE_MESSAGE[error.response.status] || error.response.statusText;
      ElMessage.error({ message: errorText, duration: msgConfig.duration });
    }
    return Promise.reject(error);
  }
);

const request = {
  get: <T>(url: string, params?: any) => {
    return axiosInstance
      .get<BaseResponse<T>>(url, { params })
      .then((response) => response.data);
  },
  post: <T>(url: string, data?: any) => {
    return axiosInstance
      .post<BaseResponse<T>>(url, data)
      .then((response) => response.data);
  },
  download: <T>(url: string, data?: any) => {
    return axiosInstance
      .post(url, data, { responseType: "blob" })
      .then((response) => response.data);
  },
};

export default request;
