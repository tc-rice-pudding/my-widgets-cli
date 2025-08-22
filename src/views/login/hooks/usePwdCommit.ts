import loginApi from "@/core/api/login";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { Encrypt } from "@/utils/encrypt";
import { useRoute, useRouter } from "vue-router";
export const usePwdCommit = () => {
  const route = useRoute();
  const router = useRouter();

  const ruleForm = reactive({
    password: "",
    passwordRepeat: "",
    loading: false,
  });

  const checkPwd = (rule: any, value: any, callback: any) => {
    let reg =
      /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,14}$/;
    if (!reg.test(value)) {
      return callback(
        new Error("8-14位， 字母、数字、特殊字符 2种或两种以上组合")
      );
    }
    return callback();
  };
  const passwordRepeat = (rule: any, value: any, callback: any) => {
    let reg =
      /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,14}$/;
    if (!reg.test(value)) {
      return callback(
        new Error("8-14位， 字母、数字、特殊字符 2种或两种以上组合")
      );
    }
    if (value !== ruleForm.password) {
      return callback(new Error("两次输入密码不一致"));
    }
    return callback();
  };
  const rules = reactive({
    password: [
      { required: true, message: "请输入新密码", trigger: "blur" },
      { validator: checkPwd, trigger: "blur" },
    ],

    passwordRepeat: [
      {
        required: true,
        trigger: "blur",
        validator: passwordRepeat,
      },
    ],
  });
  const resetPwdSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    if (ruleForm.loading) {
      return;
    }
    formEl.validate(async (valid: any) => {
      if (!valid) return;

      ruleForm.loading = true;

      const data = {
        resetPwdToken: route.query.resetPwdToken,
        newPassword: Encrypt(ruleForm.password),
        confirmPassword: Encrypt(ruleForm.passwordRepeat),
      } as any;

      await loginApi
        .forgetPwdEmailSub(data)
        .then((res) => {
          ruleForm.loading = false;
          if (res.code == 200) {
            ElMessage.success("密码重置成功");
            router.push({ path: "/login", query: {} });
          }
        })
        .catch((err) => {
          ruleForm.loading = false;
          throw new Error(err);
        });
    });
  };
  return {
    rules,
    ruleForm,
    resetPwdSubmit,
  };
};
