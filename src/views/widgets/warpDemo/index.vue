<template>
  <div class="warp-demo-view">
    <el-scrollbar height="100%">
      <el-row :gutter="20" style="height: 150px;">
        <el-col :span="16">
          <warp title="title" />
        </el-col>
        <el-col :span="8">
          <warp title="title" />
        </el-col>
      </el-row>
      <el-row :gutter="20" style="height: 400px;">
        <el-col :span="8">
          <warp title="title" />
        </el-col>
        <el-col :span="8">
          <warp title="title" />
        </el-col>
        <el-col :span="4">
          <warp title="title" />
        </el-col>
        <el-col :span="4">
          <warp title="title" />
        </el-col>
      </el-row>
      <el-row :gutter="20" style="height: 200px;">
        <el-col :span="4">
          <warp title="title" />
        </el-col>
        <el-col :span="16">
          <warp title="title" />
        </el-col>
        <el-col :span="4">
          <warp title="title" />
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script setup lang='ts'>
import warp from '@/views/widgets/warpDemo/components/warp.vue';
</script>

<style scoped lang='scss'>
.warp-demo-view {
  width: 100%;
  height: calc(100% - 20px);
  box-sizing: border-box;
  margin-top: 20px;

  :deep .el-row {
    margin: 0 0 20px !important;
  }

  :deep .el-row:last-child {
    margin-bottom: 0;
  }
}
</style>