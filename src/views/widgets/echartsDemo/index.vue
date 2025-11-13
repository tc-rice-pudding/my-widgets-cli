<template>
  <div class="warp-demo-view">
    <el-scrollbar height="100%">
      <el-row :gutter="20">
        <el-col :span="6">
          <warp title="饼图-tootip在容器内">
            <template #btn>
              <el-button type="primary" plain size="small">插槽</el-button>
            </template>
            <c.pie1 />
          </warp>
        </el-col>
        <el-col :span="8">
          <warp title="仪表盘">
            <c.gauge1 />
          </warp>
        </el-col>
        <el-col :span="10">
          <warp title="title" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <warp title="折线图">
            <c.line1 />
          </warp>
        </el-col>
        <el-col :span="14">
          <warp title="面积图">
            <c.line2 />
          </warp>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <warp title="柱状图">
            <c.bar1 />
          </warp>
        </el-col>
        <el-col :span="14">
          <warp title="柱状图">
            <c.bar2 />
          </warp>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="height: 300px;">
        <el-col :span="6">
          <warp title="词云">
            <c.wordCloud />
          </warp>
        </el-col>
        <el-col :span="8">
          <warp title="title" />
        </el-col>
        <el-col :span="10">
          <warp title="title" />
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script setup lang='ts'>
import warp from '@/views/widgets/warpDemo/components/warp.vue';
import c from './components';
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