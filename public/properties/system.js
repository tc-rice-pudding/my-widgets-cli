var baseHref = window.location.protocol + "//" + window.location.host;
var pt = "ws";
if (window.location.protocol == "https:") pt = "wss";

var globalConstant = {
  webTitle: "统一登录管理平台",
  // 钉钉登录、企业微信登录参数
  appKey: "ding3pl5eddyoyxss6ac",
  wechatId: "wxf6e4decf86ce4d36",
  agentid: 1000007,

  // 请求地址
  baseUrl: baseHref,
  requestParams: "zt/v1",

  // 管理员id

  adminId: 33,
  // aes 加解密key
  secretKey: "Y/ICzMXlWqgvv7qx+83YRkkuMNLj9nJs",
  // 加解密开启后排除在外不需要加解密的接口path，例如：["/common", "/hw?type=1"]
  excludeAesPath: [],
  // 请求体是否开启加密
  openHw110ReqEncrypt: false,
  // 只支持'/hwgz110','/hwgz110/**'两种格式,空数组则代表全部加密
  reqEncryptPath: [],
  // 响应体是否开启解密
  openHw110ResDecrypt: false,
  // 只支持'/hwgz110','/hwgz110/**'两种格式,空数组则代表全部加密
  resDecryptPath: [],

  // 插件资源地址
  pluginTokenResources: '',
  // 插件token映射关系
  pluginTokenMap: {
    'rzzx-usertoken': 'userToken',
    'rzzx-apptoken': 'appToken'
  }
};
