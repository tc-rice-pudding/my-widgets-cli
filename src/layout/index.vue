<template>
  <div class="wrapper">
    <SideBar v-if="isMenusShow && !isHorizontalMenu" />
    <div class="right">
      <div class="top">
        <el-affix position="top" :offset="0.5">
          <TopBar />
          <!-- <tag-bar /> -->
        </el-affix>
      </div>
      <div class="main">
        <AppContent />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import SideBar from "./components/sideBar/index.vue";
import TopBar from "./components/topBar/index.vue";
import AppContent from "./components/content/index.vue";
import { useResizeHandler } from "./hooks/useResizeHandler";
import { useLayoutsettings } from "@/pinia/modules/layoutSettings";

useResizeHandler();
const defaultSettings = useLayoutsettings();
const isFluid = defaultSettings.layout.isFluid;
const isTopbarFixed = defaultSettings.topbar.isFixed;
const isMenusShow = defaultSettings.menus.isShow;
const isHorizontalMenu = defaultSettings.menus.mode === "horizontal";
const isBreadcrumbsShow = computed(
  () => isHorizontalMenu && defaultSettings.breadcrumbs.isShow
);
const paddingFlag = ref(true);
const handleBreadcrumbsChange = (boo) => {
  paddingFlag.value = boo;
};

// const defaultSettings = computed(() => store.state.layoutSettings);
// const isFluid = computed(() => defaultSettings.value.layout.isFluid);
// const isTopbarFixed = computed(() => defaultSettings.value.topbar.isFixed);
// const isMenusShow = computed(() => defaultSettings.value.menus.isShow);
// const isHorizontalMenu = computed(
//   () => defaultSettings.value.menus.mode === "horizontal"
// );
// const isBreadcrumbsShow = computed(
//   () => isHorizontalMenu.value && defaultSettings.value.breadcrumbs.isShow
// );

// const paddingFlag = ref(true);
</script>
<script lang="ts">
export default {
  name: "Layout",
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  .right {
    flex: 1;
    overflow-x: hidden;
    background: #e7edee;
    position: relative;
    &.flex {
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .main {
      padding: 0 16px 16px;
      overflow: auto;
      height: calc(100% - 48px);
      overflow: hidden;
      &.pt0 {
        padding-top: 0;
      }
    }
  }
}
:deep(.el-affix--fixed) {
  width: 100% !important;
}
</style>
