// 开发环境配置文件
var globalConstant = {
  webTitle: "统一登录管理平台",
  // 钉钉登录、企业微信登录参数
  appKey: "ding3pl5eddyoyxss6ac",
  wechatId: "wxf6e4decf86ce4d36",
  agentid: 1000007,

  // 请求地址
  baseUrl: "https://zt.gat.gz",
  requestParams: "zt/v1",

  // 管理员id
  adminId: 33,

  // 插件资源地址
  pluginTokenResources: 'http://192.168.9.72/50x.html',
  // 插件token映射关系
  pluginTokenMap: {
    'rzzx-usertoken': 'userToken',
    'rzzx-apptoken': 'appToken'
  }
};
