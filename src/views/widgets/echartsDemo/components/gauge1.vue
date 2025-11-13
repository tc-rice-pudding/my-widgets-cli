<template>
  <GlobalEcharts :options="barOps" />
</template>

<script setup lang='ts'>
const barOps = computed(() => ({
  series: [
    {
      type: "gauge",
      center: ["50%", "55%"],
      radius: "100%",
      progress: {
        show: true,
        width: 8,
      },
      axisLine: {
        lineStyle: {
          width: 8,
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        length: 5,
        lineStyle: {
          width: 1,
          color: "#999",
        },
      },
      axisLabel: {
        distance: 10,
        color: "#999",
        fontSize: 12,
      },
      anchor: {
        show: true,
        showAbove: true,
        size: 12,
        itemStyle: {
          borderWidth: 5,
        },
      },
      title: {
        show: false,
      },
      detail: {
        valueAnimation: true,
        fontSize: 30,
        offsetCenter: [0, "70%"],
      },
      data: [
        {
          value: 70,
        },
      ],
    },
  ],
}));
</script>

<style scoped lang='scss'></style>