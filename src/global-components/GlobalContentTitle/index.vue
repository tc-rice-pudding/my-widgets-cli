<template>
  <div class="contet-title-box">
    <div class="title-box">
      {{ route.meta.title }}
      <slot name="leftSlot" />
    </div>
    <div class="slot-box">
      <!-- 批量删除 -->
      <slot name="batchDelete" />
      <slot name="contentAction" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>
<style lang="scss" scoped>
.contet-title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  font-weight: 600;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
  .title-box {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .slot-box {
    display: flex;
    align-items: center;
    gap: 20px;
  }
}
</style>