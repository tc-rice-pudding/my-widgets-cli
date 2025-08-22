<template>
  <div class="ForgotPassword">
    <div class="tips" v-if="ruleForm.status == 'initial'">
      我们将会发送一封包含验证码的短信到您的手机输入验证码进行密码重置
    </div>
    <div class="tips" v-else>
      请设置
      <span> {{ ruleForm.username }}</span>
      的新密码,建议使用数字 、字母、字符的组合密码，提高密码安全等级
    </div>
    <div class="form">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
        <template v-if="ruleForm.status == 'initial'">
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              type="text"
              clearable
              placeholder="请输入手机号"
            >
              <template #append>
                <div
                  @click="sendCode()"
                  class="send-code"
                  v-loading="codeState.sendStatus == 'loading'"
                >
                  {{
                    codeState.sendStatus == "init"
                      ? "发送验证码"
                      : `${codeState.time}s 后重试`
                  }}
                </div>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="captcha">
            <div class="login-code">
              <el-input
                v-model="ruleForm.captcha"
                type="text"
                autocomplete="on"
                placeholder="请输入验证码"
                clearable
              >
              </el-input>
              <img
                class="pointer"
                v-if="useHooksState.pic"
                @click="getPicCode"
                :src="useHooksState.pic"
              />
            </div>
          </el-form-item>
          <el-form-item prop="smsCode">
            <el-input
              v-model="ruleForm.smsCode"
              type="text"
              autocomplete="on"
              placeholder="请输入验证码"
            >
            </el-input>
          </el-form-item>
        </template>
        <template v-else="ruleForm.status == 'reset'">
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              :type="toggler.pwd ? 'password' : 'text'"
              placeholder="请输入新密码"
            >
              <template #append>
                <el-icon class="font-20" @click="toggler.pwd = !toggler.pwd">
                  <Hide v-if="toggler.pwd" />
                  <View v-else />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="passwordRepeat">
            <el-input
              v-model="ruleForm.passwordRepeat"
              :type="toggler.pwdRpt ? 'password' : 'text'"
              placeholder="请再次输入新密码"
            >
              <template #append>
                <el-icon
                  class="font-20"
                  @click="toggler.pwdRpt = !toggler.pwdRpt"
                >
                  <Hide v-if="toggler.pwdRpt" />
                  <View v-else />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </template>
        <el-button
          :loading="ruleForm.loading"
          type="primary"
          class="submit_btn pointer"
          @click="resetPwdSubmit(ruleFormRef)"
          >确定</el-button
        >
        <div class="back pointer">
          <span @click="backLogin">返回登录界面</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { useLoginEffect } from "../hooks/index";
import { useSendCode } from "../hooks/useSendCode";
import { phoneRules, emailRules } from "@/utils/rules";
import loginApi from "@/core/api/login";
import { Encrypt } from "@/utils/encrypt";

const { usePicCode, useHooksState } = useLoginEffect();
const { useMsgCode, codeState } = useSendCode();
let toggler = ref({
  pwd: true,
  pwdRpt: true,
});
const ruleFormRef = ref<FormInstance>();
const checkPwd = (rule: any, value: any, callback: any) => {
  let reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,14}$/;
  if (!reg.test(value)) {
    return callback(
      new Error("8-14位， 字母、数字、特殊字符 2种或两种以上组合")
    );
  }
  return callback();
};
const passwordRepeat = (rule: any, value: any, callback: any) => {
  let reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,14}$/;
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

const ruleForm = reactive({
  username: "", // 手机号
  captcha: "", // 验证码
  password: "", // 新密码
  passwordRepeat: "", // 重复密码
  loading: false,
  smsCode: "",
  pic: "",
  status: "initial",
});
const rules = reactive({
  username: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: phoneRules,
      message: "请输入正确的手机号",
      trigger: "blur",
    },
  ],
  captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
  password: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    { validator: checkPwd, trigger: "blur" },
  ],
  smsCode: [
    {
      required: true,
      message: "请输入验证码",
      trigger: "blur",
    },
  ],
  passwordRepeat: [
    {
      required: true,
      trigger: "blur",
      validator: passwordRepeat,
    },
  ],
});

const sendCode = () => {
  if (!ruleFormRef.value) return;
  const data = {
    username: ruleForm.username,
  };
  ruleFormRef.value.validateField("username", async (err) => {
    if (!err) return;
    await useMsgCode({ data });
  });
};

const getPicCode = async () => {
  await usePicCode();
};
const resetPwdSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  if (ruleForm.loading) {
    return;
  }
  formEl.validate(async (valid: any) => {
    if (!valid) return;
    const data = {
      username: ruleForm.username,
      captcha: ruleForm.captcha,
      uuid: useHooksState.uuid,
      smsCode: ruleForm.smsCode,
    } as any;
    ruleForm.loading = true;
    if (ruleForm.status === "reset") {
      const data = {
        username: ruleForm.username,
        newPassword: Encrypt(ruleForm.password),
        confirmPassword: Encrypt(ruleForm.passwordRepeat),
      } as any;

      loginApi
        .forgetPwdSub(data)
        .then((res) => {
          ruleForm.loading = false;
          if (res.code == 200) {
            ElMessage.success("密码重置成功");
          }
        })
        .catch((err) => {
          ruleForm.loading = false;
        });
    } else {
      await loginApi
        .forgetPwdVerify(data)
        .then((res) => {
          ruleForm.loading = false;
          if (res.code == 200) {
            ruleForm.status = "reset";
          }
        })
        .catch((err) => {
          ruleForm.loading = false;
          getPicCode();
        });
    }
  });
};
const emits = defineEmits(["backLogin"]);
const backLogin = () => {
  emits("backLogin");
  // state.showForgetPwd = false;
};

onMounted(() => {
  getPicCode();
});
</script>

<style scoped lang="scss">
.ForgotPassword {
  box-sizing: border-box;
  width: 413px;
  border-radius: 24px;
  padding-top: 0;
  overflow: hidden;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.05);
  width: 414px;
  background: #ffffff;
  box-shadow: 0px 4px 8px 0px rgba(117, 117, 117, 0.2);
  border-radius: 12px;

  .top-bg {
    width: 100%;
    height: 5px;
    background: #216dd9;
  }

  .tabs {
    background-color: #f6f6f6;
    padding: 10px;
    margin-top: 15px;
    height: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    span {
      display: inline-block;
      text-align: center;
      width: 35%;
      height: 30px;
      cursor: pointer;
      line-height: 30px;
    }

    .active {
      color: #216dd9;
      background-color: #fff;
    }
  }

  .tips {
    padding-bottom: 10px;
    height: 40px;
    font-size: 14px;
    font-weight: 400;
    color: #000000;
    line-height: 20px;
  }

  .form {
    .login-code {
      display: flex;
      padding: 0 11px;
      justify-content: space-around;
      align-items: center;

      img {
        margin-left: 10px;
        width: 30%;
        height: 45px;
      }
    }

    .font-20 {
      font-size: 18px;
    }

    padding: 10px 20px 20px;
    text-align: center;

    .send-code {
      cursor: pointer;
      width: 100%;
      color: #216dd9;
    }

    &:deep(.el-input__wrapper) {
      border-right: none;
    }

    &:deep(.el-input-group__append) {
      background-color: #fff;
      border: none;
    }

    :deep(.el-form-item__content .el-input) {
      margin: 15px auto;
      width: 350px;
      height: 45px;
      line-height: 45px;
    }

    .back {
      margin-top: 20px;
      text-align: center;
      height: 22px;
      font-size: 16px;

      font-weight: 400;
      color: #216dd9;
      line-height: 22px;
    }
  }

  .submit_btn {
    margin-top: 20px;
    width: 80%;
    height: 40px;
    font-size: 14px;

    font-weight: 400;
    background: #156cee;
    border-radius: 4px;
  }
}
</style>
