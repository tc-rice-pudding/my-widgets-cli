<!--
 * @Description: 
 * @Author: djq
 * @Date: 2022-12-22 00:27:58
 * @LastEditTime: 2025-05-23 10:16:27
 * @LastEditors: myname
-->
<template>
  <div ref="canvas" class="canvas" v-resize="() => {
    myChart?.resize();
  }"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted, onUnmounted, watch } from "vue";
const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(["getChatInfo", "dataZoom"]);
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

const renderChart = () => {
  myChart = echarts.init(canvas.value);
  myChart.setOption(props.options);
  window.addEventListener("resize", () => {
    if (myChart) {
      myChart.resize();
    }
  });
  myChart.on("click", (params) => {
    emit("getChatInfo", params);
  });
  myChart.on("dataZoom", (event) => {
    emit("dataZoom", event);
  });
};
watch(
  () => props.options,
  (val, oldVal) => {
    myChart && myChart.setOption(val);
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.canvas {
  min-width: 320px;
  min-height: 250px;
  overflow: hidden;
}
</style>
