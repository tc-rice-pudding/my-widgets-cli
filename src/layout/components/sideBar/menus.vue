<template>
  <el-scrollbar class="scroll">
    <el-menu class="menu" :mode="mode" :collapse="collapse" :unique-opened="false" :router="true"
      :default-active="activePath" background-color="#0C284D" text-color="#fff" active-text-color="#fff">
      <subMenu :menu="menus" />
    </el-menu>
    <div class="hamburger">
      <Hamburger />
    </div>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { computed, PropType } from "vue";
import { useRoute } from "vue-router";
import subMenu from "./subMenu.vue";
import { useMenus } from "@/pinia/modules/menu";
import Hamburger from "../topBar/Hamburger.vue";

import { storeToRefs } from "pinia";
type IModeTye = "horizontal" | "vertical";
const route = useRoute();
const { menus } = storeToRefs(useMenus());

// const menus = computed<MenuItem[]>(() => store.state.menu.menus);
const activePath = computed<string>(() => route.path);
const props = defineProps({
  collapse: {
    type: Boolean,
    default: false,
    require: false,
  },
  mode: {
    type: String as PropType<IModeTye>,
    default: "vertical",
    require: false,
  },
});
</script>
<style lang="scss">
.el-menu-item,
.el-sub-menu {
  .font_family {
    font-size: 18px;
    margin-right: 10px;
  }
}

.el-menu-item,
.el-sub-menu__title {
  font-size: 16px;
  height: 50px;
  line-height: 50px;

  &:hover {
    background-color: $menuHover !important;
  }
}

.el-menu-item,
.el-sub-menu {
  opacity: 0.7;
}

.is-active {
  opacity: 1;
}

.el-sub-menu {

  .el-menu-item,
  .el-sub-menu .el-sub-menu__title {
    background-color: $subMenuBg !important;
    opacity: 0.7;
    font-size: 14px;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
}

.el-menu-item.is-active {
  width: 208px;
  background-color: $menuActiveBg !important;
  opacity: 1;
  transition: all 0.1s;

  &:hover {
    background-color: $menuActiveBg !important;
  }
}

.el-menu--collapse {
  width: 72px;

  .el-menu-item.is-active,
  .el-sub-menu.is-active>.el-sub-menu__title {
    width: 72px;
    position: relative;
    background-color: $menuActiveBg !important;
    color: $collapseMenuActiveColor !important;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: $collapseMenuActiveBorderWidth;
      height: 100%;
      background-color: $collapseMenuActiveBorderColor;
    }
  }
}

.el-sub-menu__title i {
  color: $arrowColor;
  font-size: 16px;
}
</style>
<style lang="scss" scoped>
.scroll {
  height: auto;
  flex: 1;
  overflow-x: hidden;

  .menu {
    border: none;
  }

  .hamburger {
    border-top: 1px solid rgba($color: #ffffff, $alpha: 0.1);
    text-align: center;
    color: #ffffff;
    height: 40px;
    line-height: 40px;
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  :deep .el-menu--collapse {
    .font_family {
      margin-right: 0;
    }

    .el-sub-menu {
      display: flex;
      flex-direction: column;
      padding: 0;
      height: 64px;

      .el-sub-menu__title {
        height: 64px;
        display: inline-grid;
        width: 72px;
        line-height: unset;
        padding: 0;

        >i:first-of-type {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 0 0;

          &::before {
            display: flex;
            width: 20px;
            height: 20px;
            align-items: center;
            justify-content: center;
          }
        }

        >span {
          height: 30px !important;
          width: 100% !important;
          visibility: visible !important;
          line-height: 30px;
          text-align: center;
          font-size: 14px !important;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          padding: 0 4px 0 7px;
        }
      }
    }

    .el-menu-item {
      display: flex;
      flex-direction: column;
      padding: 0;
      height: 64px;

      >i {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 0 0;

        &::before {
          display: flex;
          width: 20px;
          height: 20px;
          align-items: center;
          justify-content: center;
        }
      }

      >span {
        flex: 1;
        height: 30px !important;
        width: 100% !important;
        visibility: visible !important;
        line-height: 30px;
        text-align: center;
        font-size: 14px !important;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 4px 0 7px;
      }
    }
  }
}
</style>
