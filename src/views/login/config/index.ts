// import { reactive } from "vue";
export const tabPatientList = reactive([
  { id: 1, label: "密码登录", domSlot: "pwd" },
  { id: 2, label: "短信登录", domSlot: "message" },
  // { id: 3, label: "钉钉登录", domSlot: "dingding" },
  // { id: 4, label: "企业微信登录", domSlot: "wechat" },
]);

export const tabForgetList = reactive([
  { id: 1, label: "手机号找回", domSlot: "pwdFind" },
  { id: 2, label: "邮箱找回", domSlot: "msgFind" },
]);
