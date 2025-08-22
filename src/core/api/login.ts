/*
 * @Description:
 * @Author: djq
 * @Date: 2023-03-16 13:17:00
 * @LastEditTime: 2023-03-21 10:24:27
 * @LastEditors: djq
 */
import request from "@/utils/request";
import { BaseResponse } from "@/core/interface/response";
const requestParams: string = (window as any).globalConstant.requestParams;

export type LoginImg = {
  img: string;
  uuid: string;
};

type loginRes = {};

type loginParameters = {
  /**
   * 验证码
   */
  captcha?: string;
  loginType: string;
  /**
   * 加密后的密码
   */
  password?: string;
  /**
   * 账号 （邮箱或者手机号）
   */
  phoneNo: string;
  /**
   * 固定值:loginPC
   */
  type: string;
  /**
   * 验证码对应的id
   */
  uuid?: string;
};

type LoginCode = {
  phone?: string;
  type: string;
  scene: string;
  email?: string;
};

type ResetPwd = {
  /**
   * 一次密码
   */
  password: string;
  /**
   * 二次密码
   */
  passwordRepeat: string;
  /**
   * 邮箱或者手机号
   */
  phoneNo: string;
  /**
   * 固定值 forgetPwdSubmit
   */
  type: string;
};

type CheckLoginCode = {
  /**
   * 验证码
   */
  captcha: string;
  /**
   * 手机号 或者 邮箱
   */
  phoneNo: string;
  /**
   * 邮箱或者短信验证码
   */
  smsCode: string;
  /**
   * 固定值 forgetPwdVerity
   */
  type: string;
  /**
   * 验证码的uuid
   */
  uuid: string;
};

export const login = (data: loginParameters) =>
  request.post<any>("/msg/gz-cloud/auth/doLogin", data);

export const getLoginImg = () =>
  request.post<LoginImg>("/msg/gz-cloud/auth/captcha", {});

export const getLoginCode = (data: LoginCode) =>
  request.post("/msg/gz-cloud/regist/sendVerificationCode", data);

/**
 *
 * @param data
 * @description 重置密码
 */
export const resetLoinPwd = (data: ResetPwd) =>
  request.post("/msg/gz-cloud/auth/forgetPwdVerity", data);

export const checkLoginCode = (data: CheckLoginCode) =>
  request.post("/msg/gz-cloud/auth/forgetPwdVerity", data);

export const logout = () => request.post("/msg/gz-cloud/auth/logout", {});

export default {
  // 图形验证码
  getCaptcha(params: {}) {
    return request.post<any>("/zt/v1/login/captcha", params);
  },
  // 密码登录
  loginPwd(params: loginParameters) {
    return request.post<any>("/zt/v1/login/login", params);
  },
  // 短信验证码
  getMsgCode(params: any) {
    return request.post<any>("/zt/v1/login/sms-code", params);
  },
  // 钉钉回调
  loginByDingding({ code, state }: any) {
    return request.post<any>(`/zt/v1/dd/callback?code=${code}&state=${state}`);
  },
  // wechat回调
  loginByWechat({ code, state, appid }: any) {
    return request.post<any>(
      `/zt/v1/wechat-e/callback?code=${code}&state=${state}&appid=${appid}`
    );
  },
  //应用内部登录
  loginAuth: (params) => {
    return request.post<any>(`${requestParams}/login/auth`, params);
  },
  //忘记密码验证
  forgetPwdVerify: (params) => {
    return request.post<any>(`${requestParams}/user/forget-pwd-verify`, params);
  },
  // 忘记密码提交
  forgetPwdSub: (params) => {
    return request.post<any>(`${requestParams}/user/forget-pwd-submit`, params);
  },
  // 忘记密码
  forgetPwdEmail: (params) => {
    return request.post<any>(`${requestParams}/user/forget-pwd-email`, params);
  },
  // 忘记密码
  forgetPwdEmailSub: (params) => {
    return request.post<any>(
      `${requestParams}/user/forget-pwd-email-submit`,
      params
    );
  },
  resetPwd: (params) => {
    return request.post<any>(`${requestParams}/user/reset-pwd`, params);
  },
};
