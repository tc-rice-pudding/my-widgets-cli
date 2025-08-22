<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
const locale = zhCn;
</script>
<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
</style>
