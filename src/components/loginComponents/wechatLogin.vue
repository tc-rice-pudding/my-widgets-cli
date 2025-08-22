<template>
  <div id="wx_box" />
</template>
<script lang="ts" setup>
import { useLoginEffect } from "./hooks";
import loginApi from "@/core/api/login";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
const route = useRoute();
const { psuhPage } = useLoginEffect();

const appKey = (window as any).globalConstant.wechatId;
const agentid = (window as any).globalConstant.agentid;

const state = reactive({
  auth: `https://${window.location.host}/upms/login`,
  // auth: "https://csp.bjydzy.com:48083/web/upms/login",
  // appKey: "ding3pl5eddyoyxss6ac",
  appKey,
});
const initWxLogin = () => {
  (window as any).WwLogin({
    id: "wx_box", // 登录页面显示二维码的容器id
    appid: state.appKey, // 企业微信的CorpID，在企业微信管理端查看
    agentid: agentid, // 授权方的网页应用id，在具体的网页应用中查看
    redirect_uri: encodeURIComponent(state.auth), // 重定向的地址，需要进行encode
    state: "ddd",
  });
};

onMounted(() => {
  const { code, state, appid } = route.query;
  if (code && appid) {
    loginApi
      .loginByWechat({ code, state, appid })
      .then((res) => {
        // const { result } = res;
        // const { token } = res.data as any;
        psuhPage(res.data);
        // state.loginCommit(result);
      })
      .catch(() => {
        // router.push({ query: {} });
        initWxLogin();
      });
  } else {
    initWxLogin();
  }
});
</script>

<style lang="scss" scoped>
// @import "./login.scss";
#wx_box {
  text-align: center;
}
</style>
