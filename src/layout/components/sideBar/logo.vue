<template>
  <div class="brand">
    <img class="logo" src="" @click="goHome" />
    <img class="title" src="" @click="goHome" />
    <el-icon
      class="icon font_family icon-yingyong1"
      :class="{ collapse: !collapse }"
      @click="goHome"
    >
    </el-icon>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  collapse: {
    type: Boolean,
    default: false,
  },
});
const goHome = () => {
  router.push("/");
};
</script>
<style lang="scss" scoped>
.brand {
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  background: #1554ad;
  .collapse {
    font-size: 30px;
  }
  .logo {
    cursor: pointer;
    height: 33px;
    width: auto;
    display: none;
  }
  .title {
    position: relative;
    right: 10px;
    height: 33px;
    width: auto;
    transition: all 0.5s;
  }
}
</style>
