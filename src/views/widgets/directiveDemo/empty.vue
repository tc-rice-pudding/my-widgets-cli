<template>
  <el-button type="primary" style="position: absolute; top: 10px; right: 40px;" @click="showEmpty=!showEmpty">切换</el-button>

  <!-- 自定义文字：显示"暂无订单数据" -->
  <div class="container" v-empty="{ show: showEmpty, text: '暂无订单数据' }">
    <el-skeleton />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 控制空状态显隐
const showEmpty = ref(true)
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
}
</style>