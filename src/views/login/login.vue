<template>
  <GlobalHeader type="login" />
  <div class="login">
    <div class="login_left">
      <img class="login_pic_1" :src="Login_bg" />
      <p class="title">{{ webTitle }}</p>
    </div>
    <div class="login_right">
      <el-card class="login_right_window">
        <template v-if="!state.shwoEamilPwd">
          <template v-if="!state.showForgetPwd">
            <!-- @handleClick="handleTabClick" -->
            <GlobalTabPanes :tabList="tabPatientList">
              <template #pwd>
                <PwdLogin />
              </template>
              <template #message>
                <MsgLogin />
              </template>
              <template #dingding>
                <DDLogin />
              </template>
              <template #wechat>
                <WechatLogin />
              </template>
            </GlobalTabPanes>
          </template>
          <template v-else>
            <GlobalTabPanes :tabList="tabForgetList">
              <template #pwdFind>
                <PwdForget @backLogin="backLogin" />
              </template>
              <template #msgFind>
                <EmailForget @backLogin="backLogin" />
              </template>
            </GlobalTabPanes>
          </template>
          <div class="operate pointer" v-if="!state.showForgetPwd">
            <span @click="state.showForgetPwd = true">忘记密码</span>
          </div>
        </template>
        <template v-else>
          <p style="text-align: center">邮箱重置密码</p>
          <el-form
            ref="ruleFormRef"
            class="login-form"
            :model="ruleForm"
            :rules="rules"
          >
            <el-form-item prop="password">
              <el-input
                v-model="ruleForm.password"
                :type="toggler.pwd ? 'password' : 'text'"
                placeholder="请输入新密码"
              >
                <template #append>
                  <el-icon
                    class="font-20 pointer"
                    @click="toggler.pwd = !toggler.pwd"
                  >
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
                    class="font-20 pointer"
                    @click="toggler.pwdRpt = !toggler.pwdRpt"
                  >
                    <Hide v-if="toggler.pwdRpt" />
                    <View v-else />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <el-button
            :loading="ruleForm.loading"
            type="primary"
            class="submit_btn pointer"
            @click="resetEmailSubmit()"
            >确定</el-button
          >
        </template>
      </el-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Login_bg from "@/assets/images/login_bg.png";
import { tabPatientList, tabForgetList } from "./config";
import {
  DDLogin,
  MsgLogin,
  PwdLogin,
  WechatLogin,
} from "@/components/loginComponents/index";
import PwdForget from "./components/pwdForget.vue";
import EmailForget from "./components/emailForget.vue";
import { useRoute } from "vue-router";
import { usePwdCommit } from "./hooks/usePwdCommit";
import { FormInstance } from "element-plus";

const webTitle = (window as any).globalConstant.webTitle;
const { rules, resetPwdSubmit, ruleForm } = usePwdCommit();
const ruleFormRef = ref<FormInstance>();

const route = useRoute();
const state = reactive({
  showForgetPwd: false,
  shwoEamilPwd: false,
});
let toggler = ref({
  pwd: true,
  pwdRpt: true,
});
const resetEmailSubmit = () => {
  resetPwdSubmit(ruleFormRef.value);
};
onMounted(() => {
  const { resetPwdToken } = route.query;
  if (resetPwdToken) {
    state.shwoEamilPwd = true;
  } else {
    state.shwoEamilPwd = false;
  }
});
const backLogin = () => {
  state.showForgetPwd = false;
};
</script>

<style lang="scss" scoped>
@import "./login.scss";
</style>

<style lang="scss">
.login_left {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  .login_pic_1 {
    margin-top: 20%;
    width: 500px;
    height: 360px;
  }
  .title {
    text-align: center;
    font-size: 28px;
    color: #000000;
    font-weight: bolder;
    margin-top: 30px;
    font-family: "Microsoft YaHei" !important;
  }
}
.login_right {
  // .el-form-item {
  //   margin: 30px auto;
  //   width: 350px;
  // }
  .login-form .el-form-item {
    margin: 30px auto;
    width: 350px;
  }
  .submit_btn {
    width: 280px;
    height: 40px;
    margin: 10px auto;
    display: block;
    background: #156cee;
  }
  .operate {
    line-height: 45px;
    text-align: right;
    padding-right: 20px;
    font-size: 14px;
    font-weight: 400;
    color: #0006;
  }
  .login-code {
    display: flex;
    width: 100%;
  }
  .login-code img {
    margin-left: 10px;
    width: 40%;
  }
}
</style>
