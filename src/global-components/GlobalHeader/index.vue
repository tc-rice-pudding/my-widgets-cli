<!--
 * @Description: 
 * @Author: djq
 * @Date: 2023-03-16 13:42:10
 * @LastEditTime: 2023-03-17 13:16:13
 * @LastEditors: djq
-->
<template>
  <div class="global-header">
    <div class="head-left" v-if="props.customHeaderLeft">
      <slot name="left" />
    </div>
    <div class="head-left" v-else>{{ webTitle }}</div>
    <div class="head-right" v-if="!authorization">
      <span @click="toLogin" v-if="!checkLogin">登录</span>
    </div>
    <div class="action" v-else>
      <!-- right slot eg.消息 -->
      <slot name="right" />
      <userInfo />
    </div>
    <!-- center slot -->
    <div class="center-slot">
      <slot name="center" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/global-components/SvgIcon/index.vue";
import router from "@/router";
import auth from "@/utils/token";
import { computed } from "vue";
import { useApp } from "@/pinia/modules/app";
import userInfo from "../../layout/components/topBar/userInfor.vue";

const webTitle = (window as any).globalConstant.webTitle;
const { authorization } = useApp();
const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  customHeaderLeft: {
    type: Boolean,
    default: false,
  },
});

/**
 * @description 技术文档
 */
const openDocument = () => {
  // TODO  技术文档链接
};
const goHome = () => {
  router.push("/intruc");
};

/**
 * @description 去登录
 */
const toLogin = () => {
  router.push("/login");
};

const checkLogin = computed(() => {
  return auth.isLogin();
});
</script>

<style lang="scss" scoped>
.global-header {
  z-index: 99;
  top: 0;
  position: fixed;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(3px);
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .head-left {
    padding-left: 24px;
    font-size: 18px;
    font-weight: 500;
    color: #000000;
    font-family: PingFangSC-Medium, PingFang SC;
  }
  .head-right {
    width: 140px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .action {
    display: flex;
    align-items: center;
  }
  .center-slot {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
