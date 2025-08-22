<template>
  <div class="tag-bar" :class="[headerWidth ? 'header-w64' : 'header-w208']">
    <div class="tags-container">
      <el-scrollbar
        ref="scrollContainer"
        :vertical="false"
        class="scroll-container"
        @wheel.prevent="onScroll"
      >
        <router-link
          v-for="(tag, i) in tagList"
          :key="tag.fullPath"
          :ref="(el) => setItemRef(i, el)"
          v-slot="{ navigate, isActive }"
          :to="{ path: tag.path, query: tag.query }"
          custom
        >
          <div
            class="tags-item"
            :class="isActive ? 'active' : ''"
            @click="navigate"
          >
            <span class="title">{{ tag.title }}</span>
            <el-icon
              v-if="!isAffix(tag)"
              :class="isActive ? 'active-close-icon' : ''"
              @click.prevent.stop="closeTag(tag)"
            >
              <Close />
            </el-icon>
          </div>
        </router-link>
      </el-scrollbar>
    </div>
    <el-dropdown size="small">
      <el-button type="primary">
        标签选项
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu size="small" :split-button="true">
          <el-dropdown-item @click="closeOtherTags">关闭其他</el-dropdown-item>
          <el-dropdown-item @click="closeAllTags">关闭全部</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import { Close } from "@element-plus/icons-vue";
import { useTags } from "./hooks/useTags";
import { useContextMenu } from "./hooks/useContextMenu";
import headerWidthE from "../../hooks/headerWidth";

export default defineComponent({
  name: "TagBar",
  components: { Close },
  setup() {
    const tags = useTags();
    const contextMenu = useContextMenu(tags.tagList);
    const headerWidth = headerWidthE();
    const onScroll = (e: Event) => {
      tags.handleScroll(e);
      contextMenu.closeMenu.value();
    };
    return {
      onScroll,
      ...tags,
      ...contextMenu,
      headerWidth,
    };
  },
});
</script>

<style lang="scss" scoped>
.tag-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin: 3px 0;
  // padding: 0 24px;
  background-color: #f4f7ff;
}
.tags-container {
  // height: 32px;
  margin: 8px 0;
  // padding-right: 100px;
  &.hide {
    display: none;
  }
  .scroll-container {
    white-space: nowrap;
    overflow: hidden;
    :deep(.el-scrollbar__bar) {
      bottom: 0px;
    }
  }
  .tags-item {
    display: inline-block;
    height: 32px;
    line-height: 32px;
    box-sizing: border-box;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    color: #2a2b2e;
    background: #fff;
    padding: 0 10px;
    font-size: 14px;
    margin-left: 8px;
    vertical-align: bottom;
    cursor: pointer;
    user-select: none;
    border-radius: 4px;
    &:first-of-type {
      margin-left: 0;
    }
    &.active {
      color: $mainColor;
      border-bottom: 2px solid $mainColor;
    }
    .title {
      display: inline-block;
      vertical-align: top;
      max-width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .el-icon {
      position: relative;
      top: 2px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      margin: 0 4px;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:hover {
        border-radius: 50%;
        background-color: #333;
        color: #fff;
      }
    }
    .active-close-icon {
      color: $mainColor;
    }
  }
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: fixed;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  li {
    margin: 0;
    padding: 8px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
:deep(.el-dropdown) {
  // position: absolute;
  // right: 0;
  // top: 0;
  font-size: 14px;
  box-shadow: -3px 0 15px 3px rgb(0 0 0 / 10%);
  .el-button > span {
    font-size: 12px;
  }
}
:deep(
    .el-dropdown-menu__item:not(.is-disabled):hover,
    .el-dropdown-menu__item:focus
  ) {
  background: #edf1ff;
  color: #2a2b2e;
  font-weight: bold;
}
</style>
