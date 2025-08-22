<template>
  <el-form
    ref="loginForm"
    label-position="top"
    :model="state.ruleForm"
    :rules="rules"
    class="login-form"
    autocomplete="on"
  >
    <el-form-item prop="username">
      <el-input
        v-model="state.ruleForm.username"
        type="text"
        clearable
        autocomplete="on"
        placeholder="请输入手机号"
      >
        <template #prepend>
          <el-icon size="18px">
            <User />
          </el-icon>
        </template>
        <template #append>
          <div
            class="send-code"
            v-loading="state.status == 'loading'"
            @click="sendCode"
            style="color: #216dd9; cursor: pointer"
          >
            {{
              state.status == "padding" ? state.time + "s 后重试" : "发送验证码"
            }}
          </div>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="smsCode">
      <el-input
        v-model="state.ruleForm.smsCode"
        type="text"
        autocomplete="on"
        placeholder="请输入短信验证码"
        clearable
      >
        <template #prepend>
          <el-icon size="18px">
            <Lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="captcha">
      <div class="login-code">
        <el-input
          v-model="state.ruleForm.captcha"
          type="text"
          autocomplete="on"
          placeholder="请输入图形验证码"
          clearable
        >
          <template #prepend>
            <el-icon class="font_family icon-yanzhengma" size="18px"></el-icon>
          </template>
        </el-input>
        <img
          v-if="useHooksState.pic"
          @click="getPicCode"
          :src="useHooksState.pic"
        />
      </div>
    </el-form-item>
    <el-form-item prop="remeberPwd">
      <div class="login-other">
        <div class="tip">
          <el-checkbox
            class="remeber_pwd_box"
            v-model="state.ruleForm.remeberPwd"
          />
          我已阅读并同意
          <a href="#javascript:;" @click="state.agreementVisible = true"
            >服务协议</a
          >和
          <a href="#javascript:;" @click="state.policyVisilbe = true"
            >隐私政策</a
          >
        </div>
      </div>
    </el-form-item>
    <el-button
      :loading="useHooksState.loading"
      type="primary"
      class="btn submit_btn"
      @click="loginValidate(loginForm)"
      >{{ state.btnText }}</el-button
    >
  </el-form>
</template>
<script lang="ts" setup>
import { useLoginEffect } from "./hooks";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import loginApi from "@/core/api/login";
const loginForm = ref<FormInstance>();
const emits = defineEmits(["loginAuthPwdSubmit"]);

const { checkLogin, loginSubmit, usePicCode, useHooksState, loginAuthSubmit } =
  useLoginEffect();
const rules = reactive([]);
const state = reactive({
  ruleForm: {
    remeberPwd: true,
    username: "",
    smsCode: "",
    captcha: "",
  },
  pic: "",
  uuid: "",
  time: 60,
  btnText: "登录",
  agreementVisible: false,
  policyVisilbe: false,
  status: "init",
  timer: null as any,
});
const props = defineProps({
  //如果不需要忘记密码则不显示且是应用内部登录
  showForgetPwd: {
    type: Boolean,
    require: true,
    default: true,
  },
  authObj: {
    type: Object,
    require: false,
    default: () => ({}),
  },
});

const handleTabClick = () => {};
const loginValidate = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  if (useHooksState.loading) {
    return;
  }
  formEl.validate(async (valid: any, obj) => {
    if (valid) {
      if (!state.ruleForm.remeberPwd) {
        return ElMessage.warning("请勾选协议条款");
      }
      const loginParams = {
        ...state.ruleForm,
        uuid: useHooksState.uuid,
        lastStep: true, //是否是最后一步 true登录成功会返回用户信息和应用信息 否则不返回
        loginType: 2,
      } as any;
      if (!props.authObj.ticket) {
        //统一登录页面登录
        await loginSubmit(loginParams);
      } else {
        loginParams.ticket = props.authObj.ticket;
        loginParams.appId = props.authObj.appId;
        // loginParams.appId = "129";
        // loginParams.ticket = "860a14402bb54c36a549ad453a5fc962";
        try {
          //应用登录页面登录
          const res = await loginAuthSubmit(loginParams);
          emits("loginAuthPwdSubmit");
        } catch (error) {}
      }
    }
  });
};

const sendCode = async () => {
  if (state.status == "padding") return false;
  if (!state.ruleForm.username) return false;
  state.status = "loading";
  try {
    const res = await loginApi.getMsgCode({
      username: state.ruleForm.username,
    });
    state.status = "padding";
    if (res.code == 200) {
      state.timer = setInterval(() => {
        if (state.time == 0) {
          initTimer();
          return;
        }
        state.time--;
      }, 1000);
      ElMessage.success("发送成功!");
    } else {
      initTimer();
    }
  } catch (error) {
    initTimer();
  }
};
const initTimer = () => {
  clearInterval(state.timer);
  state.status = "init";
  state.time = 60;
};
const getPicCode = async () => {
  await usePicCode();
};

onMounted(() => {
  getPicCode();
});
</script>

<style lang="scss" scoped>
// @import "./login.scss";
</style>
