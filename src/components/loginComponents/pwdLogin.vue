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
        placeholder="请输入邮箱或手机号"
      >
        <template #prepend>
          <el-icon size="18px">
            <User />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="state.ruleForm.password"
        type="password"
        autocomplete="on"
        placeholder="请输入密码"
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
    <!-- :loading="state.loading" -->

    <el-button
      :loading="useHooksState.loading"
      type="primary"
      class="btn submit_btn"
      @click="loginValidate(loginForm)"
      >{{ state.btnText }}</el-button
    >
    <!-- <div class="operate" v-if="props.showForgetPwd">
      <span @click="state.showForgetPwdForm = true">忘记密码</span>
    </div> -->
  </el-form>
  <!-- <ForgotPassword v-if="state.showForgetPwdForm" /> -->
  <AgreementDialog
    :dialogVisible="state.agreementVisible"
    @close="state.agreementVisible = false"
  />
  <PolicyDialog
    :dialogVisible="state.policyVisilbe"
    @close="state.policyVisilbe = false"
  />
</template>
<script lang="ts" setup>
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { phoneRules, emailRules } from "@/utils/rules";
import { Encrypt } from "@/utils/encrypt";
import AgreementDialog from "./agreement.vue";
import PolicyDialog from "./policy.vue";
import { useRouter, useRoute } from "vue-router";
import { useLoginEffect } from "./hooks";

import { useApp } from "@/pinia/modules/app";
import { useAccount } from "@/pinia/modules/account";
const { initToken } = useApp();
const { setUserInfo, setAuthInfo } = useAccount();

const router = useRouter();
const loginForm = ref<FormInstance>();
const emits = defineEmits(["loginAuthPwdSubmit"]);

const rules = [];
const {
  useForgetPwd,
  loginSubmit,
  usePicCode,
  useHooksState,
  loginAuthSubmit,
} = useLoginEffect();
const state = reactive({
  ruleForm: {
    remeberPwd: true,
    username: "admin",
    password: "1111",
    captcha: "1111",
  },
  time: 60,
  btnText: "登录",
  agreementVisible: false,
  policyVisilbe: false,
  showForgetPwdForm: false,
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
const loginValidate = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  // if (useHooksState.loading) {
  //   return;
  // }
  setTimeout(() => {
    initToken("1111");
    setUserInfo({ username: "admin" });
    router.push("/");
  }, 1000);
  // formEl.validate(async (valid: any, obj) => {
  //   if (valid) {
  //     if (!state.ruleForm.remeberPwd) {
  //       return ElMessage.warning("请勾选协议条款");
  //     }
  //     let loginParams = {
  //       ...state.ruleForm,
  //       uuid: useHooksState.uuid,
  //       lastStep: true, //是否是最后一步 true登录成功会返回用户信息和应用信息 否则不返回
  //       loginType: 1,
  //     } as any;
  //     loginParams["password"] = Encrypt(state.ruleForm.password);
  //     state.btnText = "登录中...";
  //     if (!props.authObj.ticket) {
  //       //统一登录页面登录
  //       await loginSubmit(loginParams);
  //     } else {
  //       loginParams.ticket = props.authObj.ticket;
  //       loginParams.appId = props.authObj.appId;
  //       try {
  //         //应用登录页面登录
  //         const res = await loginAuthSubmit(loginParams);

  //         emits("loginAuthPwdSubmit");
  //       } catch (error) {
  //         console.log("??");
  //       }
  //     }
  //     state.btnText = "登录";
  //   }
  // });
};

const checkLogin = () => {
  useForgetPwd();
};
const getPicCode = async () => {
  await usePicCode();
};
getPicCode();
onBeforeUnmount(() => {
  //   clearInterval(state.timer);
});
</script>

<style lang="scss" scoped>
// @import "./login.scss";
</style>
