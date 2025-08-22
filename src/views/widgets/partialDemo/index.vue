<template>
  <div class="warp-demo-view">
    <el-scrollbar height="100%">
      <el-row :gutter="20">
        <el-col :span="12">
          <warp title="时间范围-默认格式化-限制时间范围40天">
            <TimePick v-model:timeRange="state.timeRange1" :limitDays="40" />
            <p>{{ state.timeRange1 }}</p>
          </warp>
        </el-col>
        <el-col :span="12">
          <warp title="时间范围-指定格式化格式">
            <TimePick
              v-model:timeRange="state.timeRange2"
              :format="['YYYY-MM-DD 00:00:00', 'YYYY-MM-DD HH:00:00']"
            />
            <p>{{ state.timeRange2 }}</p>
          </warp>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <warp title="搜索框-默认">
            <SearchWidget v-model:condition="state.condition1" />
            <p>{{ state.condition1 }}</p>
          </warp>
        </el-col>
        <el-col :span="12">
          <warp title="搜索框-隐藏前缀">
            <SearchWidget
              v-model:condition="state.condition2"
              :showPrepend="false"
            />
            <p>{{ state.condition2 }}</p>
          </warp>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="height: 200px">
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
import warp from "@/views/widgets/warpDemo/components/warp.vue";
import TimePick from "./components/timePick.vue";
import SearchWidget from "./components/searchWidget.vue";

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