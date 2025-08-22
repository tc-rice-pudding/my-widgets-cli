<template>
  <div ref="headEl" class="header" :class="[headerWidth ? 'header-w64' : 'header-w208']">
    <div class="navigation">
      {{ title }}
    </div>
    <Breadcrumbs />
    <div class="action">
      <userInfo />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import Breadcrumbs from "./Breadcrumbs.vue";
import userInfo from "./userInfor.vue";
import headerWidthE from "../../hooks/headerWidth";
import { useLayoutsettings } from "@/pinia/modules/layoutSettings";
import { useApp } from "@/pinia/modules/app";
const { title } = useApp();
const defaultSettings = useLayoutsettings();

const headEl = ref();
const headerWidth = headerWidthE();
const isHorizontalMenu = computed(
  () => defaultSettings.menus.mode === "horizontal"
);
const isShowBreadcrumbs = computed(
  () => defaultSettings.breadcrumbs.isShow && !isHorizontalMenu.value
);
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 48px;
  background: #fff;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);

  &.no-border {
    border: none;
  }

  .navigation {
    display: flex;
    align-items: center;
    overflow: hidden;
    padding-left: 16px;
    font-size: 18px;
  }

  .action {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
  }
}

.mobile {
  padding-right: 0;

  :deep(.logo) {
    max-width: 24px;
    max-height: 24px;
  }

  :deep(.title) {
    display: none;
  }
}

.show-title {
  :deep(.title) {
    display: block;
    color: #333;
  }
}

:deep(.el-dropdown) {
  position: relative;
  top: 2px;
}
</style>
