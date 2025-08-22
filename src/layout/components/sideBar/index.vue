<template>
  <div class="left" :class="{ collapse: collapse }">
    <logo :collapse="collapse" />
    <menus :collapse="collapse" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useApp } from "@/pinia/modules/app";
import { storeToRefs } from "pinia";
import Logo from "./logo.vue";
import menus from "./menus.vue";

const appStore = storeToRefs(useApp());
const { sidebar, device } = appStore;
const collapse = computed(() => sidebar.value.collapse);
</script>

<style lang="scss" scoped>
.left {
  width: 208px;
  background: $menuBg;
  transition: all 0.2s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &.collapse {
    width: 72px;
    transition: all 0.2s;
    :deep(.brand .title) {
      display: none;
    }
    :deep(.brand .logo) {
      display: block;
    }
    :deep(.el-menu-item > span),
    :deep(.el-sub-menu__title > span) {
      height: 0;
      width: 0;
      overflow: hidden;
      visibility: hidden;
      display: inline-block;
    }
    :deep(.el-sub-menu__icon-arrow) {
      display: none;
    }
  }
}
</style>
