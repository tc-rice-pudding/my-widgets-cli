<template>
  <div id="dd_QRcode_login" />
</template>
<script lang="ts" setup>
import loginApi from "@/core/api/login";
import { useLoginEffect } from "./hooks";
const { psuhPage } = useLoginEffect();
import { ElMessage } from "element-plus";
const appKey = (window as any).globalConstant.appKey;
const state = reactive({
  auth: `https://${window.location.host}/upms/login`,
  // appKey: "ding3pl5eddyoyxss6ac",
  appKey,
});
const instanceDDLogin = (appKey) => {
  initDDQRCode();
};
const initDDQRCode = () => {
  (window as any).DTFrameLogin(
    {
      id: "dd_QRcode_login",
      width: 300,
      height: 300,
    },
    {
      redirect_uri: encodeURIComponent(state.auth),
      client_id: state.appKey,
      scope: "snsapi_login",
      response_type: "code",
      state: "dddd",
      prompt: "consent",
    },
    (loginResult) => {
      const { authCode } = loginResult;
      if (authCode) {
        handleCodeLogin(authCode);
        console.log("钉钉扫码授权code：", authCode);
        // emits("handleCodeLogin", { authCode, satte: "dddd" });
      } else {
        ElMessage.error({
          message: "钉钉扫码授权失败，请联系管理员",
          duration: 2000,
        });
      }
    },
    (errorMsg) => {
      // 这里一般需要展示登录失败的具体原因
      alert(`Login Error: ${errorMsg}`);
    }
  );
};
const handleCodeLogin = (authCode) => {
  loginApi.loginByDingding({ code: authCode, state: "dddd" }).then((res) => {
    const { token } = res.data as any;
    psuhPage(res.data);
  });
  // .catch(() => {
  //   ElMessage.error({
  //     message: "钉钉扫码授权失败，请联系管理员",
  //     duration: 2000,
  //   });
  // });
};
onMounted(() => {
  instanceDDLogin(state.appKey);
});
</script>

<style lang="scss">
#dd_QRcode_login {
  transform: scale(1.2);
  iframe {
    margin: 0 auto;
    display: flex;
  }
}
// @import "./login.scss";
</style>
