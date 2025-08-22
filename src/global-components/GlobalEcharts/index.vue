<!--
 * @Description: 
 * @Author: djq
 * @Date: 2022-12-22 00:27:58
 * @LastEditTime: 2022-12-23 15:18:15
 * @LastEditors: djq
-->
<template>
  <div ref="canvas" v-resize="resize" class="canvas"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref, watch } from "vue";
const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
});
const canvas = ref(); // dom实例
let myChart = null as echarts.ECharts | null; // echarts实例
onUnmounted(() => {
  myChart?.dispose();
  // window.removeEventListener("resize", (e) => myChart?.resize());
}),
  onMounted(() => {
    renderChart();
    // window.addEventListener("resize", (e) => myChart?.resize());
  });

const resize = () => {
  myChart?.resize();
};

const renderChart = () => {
  myChart = echarts.init(canvas.value);
  myChart.setOption(props.options);
};
watch(
  () => props.options,
  (val, oldVal) => {
    myChart && myChart.setOption(val);
  }
);
</script>

<style lang="scss" scoped>
.canvas {
  min-width: 320px;
  min-height: 250px;
  max-height: 302px;
  overflow: hidden;
}
</style>
