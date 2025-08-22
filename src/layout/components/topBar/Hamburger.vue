<template>
  <el-icon
    class="fold-btn"
    :class="{ collapse: collapse }"
    @click="handleToggleMenu"
    ><Expand
  /></el-icon>
  <!-- <el-icon><Expand /></el-icon> -->
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { Expand } from "@element-plus/icons-vue";
import { useApp } from "@/pinia/modules/app";

const appStore = useApp();
const { setCollapse } = appStore;
const { sidebar } = storeToRefs(appStore);

const collapse = computed(() => sidebar.value.collapse);
const handleToggleMenu = () => {
  setCollapse(!sidebar.value.collapse);
};
</script>
<style lang="scss" scoped>
.fold-btn {
  width: 40px;
  line-height: 48px;
  padding: 0 10px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    // background: #f5f5f5;
  }
  &.collapse {
    transform: scale(-1, 1);
  }
}
</style>
