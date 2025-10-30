<template>
  <div class="warp-demo-view">
    <el-scrollbar height="100%">
      <el-row :gutter="20">
        <el-col :span="12">
          <warp title="时间范围-默认格式化-限制时间范围40天">
            <p.timePick v-model:timeRange="state.timeRange1" :limitDays="40" />
            <p>{{ state.timeRange1 }}</p>
          </warp>
        </el-col>
        <el-col :span="12">
          <warp title="时间范围-指定格式化格式">
            <p.timePick v-model:timeRange="state.timeRange2" :format="['YYYY-MM-DD 00:00:00', 'YYYY-MM-DD HH:00:00']" />
            <p>{{ state.timeRange2 }}</p>
          </warp>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <warp title="搜索框-默认">
            <p.searchWidget v-model:condition="state.condition1" />
            <p>{{ state.condition1 }}</p>
          </warp>
        </el-col>
        <el-col :span="12">
          <warp title="搜索框-隐藏前缀">
            <p.searchWidget v-model:condition="state.condition2" :showPrepend="false" />
            <p>{{ state.condition2 }}</p>
          </warp>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <warp title="有限状态机demo">
            <p.trafficLight />
          </warp>
        </el-col>
        <el-col :span="8">
          <warp title="TOP 排行">
            <p.order />
          </warp>
        </el-col>
        <el-col :span="6">
          <warp title="TOP 排行">
            <p.top />
          </warp>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="height: 200px">
        <el-col :span="6">
          <warp title="总览">
            <p.overview />
          </warp>
        </el-col>
        <el-col :span="6">
          <warp title="title">
          </warp>
        </el-col>
        <el-col :span="6">
          <warp title="title">
          </warp>
        </el-col>
        <el-col :span="6">
          <warp title="title">
          </warp>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script setup lang='ts'>
import warp from "@/views/widgets/warpDemo/components/warp.vue";
import p from "./components";

const state = reactive({
  timeRange1: [],
  timeRange2: [],
  condition1: {},
  condition2: {},
});
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