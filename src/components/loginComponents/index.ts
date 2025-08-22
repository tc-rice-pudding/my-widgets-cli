import { ElMessage, FormInstance, FormRules } from "element-plus";
import { phoneRules, emailRules } from "@/utils/rules";

export { default as DDLogin } from "./ddLogin.vue";
export { default as MsgLogin } from "./msgLogin.vue";
export { default as PwdLogin } from "./pwdLogin.vue";
export { default as WechatLogin } from "./wechatLogin.vue";
// export { default as ForgotPassword } from "./ForgotPassword.vue";

const checkPhoneAndEmail = (rule: any, value: any, callback: any) => {
  if (!(phoneRules.test(value) || emailRules.test(value))) {
    return callback(new Error("手机号或邮箱格式错误！"));
  }
  return callback();
};

export const rules = reactive<FormRules>({
  captcha: [
    {
      required: true,
      message: "请输入验证码",
      trigger: "blur",
    },
  ],
  username: [
    {
      required: true,
      message: "请输入邮箱或手机号",
      trigger: "blur",
    },
    {
      validator: checkPhoneAndEmail,
      trigger: "blur",
    },
  ],

  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
  remeberPwd: [
    {
      type: "boolean",
      required: true,
      message: "请勾选",
      trigger: "change",
    },
  ],
});
