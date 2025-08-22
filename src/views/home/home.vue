<template>
  <GlobalContentTitle></GlobalContentTitle>
  <div class="home">
    <div class="img"></div>
    <div class="desc">
      <span class="text-weight"> {{ userInfo.name }}</span>，欢迎使用{{ title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAccount } from "@/pinia/modules/account";
import { useApp } from "@/pinia/modules/app";
const { userInfo } = useAccount();
const { title } = useApp();
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 146px;
  width: 100%;
  background: linear-gradient(#ffffff 0%, #f3fcff 100%);
  border-radius: 4px;

  .img {
    margin: 0 28px 0 32px;
    height: 82px;
    width: 96px;
    background-image: url(@/assets/images/home-box.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .desc {
    font-size: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.8);
    line-height: 33px;
    letter-spacing: 2px;
  }
}
</style>
