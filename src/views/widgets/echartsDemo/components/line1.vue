<template>
  <GlobalEcharts :options="lineOps" />
</template>

<script setup lang='ts'>
const lineOps = computed(() => ({
  title: {
    text: '单位: 个',
    textStyle: {
      fontWeight: 400,
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)'
    },
    right: 4
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderColor: 'rgba(0,0,0,0.6)',
    formatter(args) {
      const { name, seriesName: seriesName, marker, value } = args?.[0] ?? {};
      const { seriesName: seriesName2, marker: marker2, value: value2 } = args?.[1] ?? {};
      return `
        <div style='color: rgba(255,255,255,0.8);'>
          <p style='line-height: 24px;'>${name}</p>
          <p style='line-height: 24px;'>${marker}<span style="padding: 0 30px 0 10px;">${seriesName}</span><span>${value}个</span></p>
          <p style='line-height: 24px;'>${marker2}<span style="padding: 0 30px 0 10px;">${seriesName2}</span><span>${value2}个</span></p>
        </div>
      `;
    },
  },
  legend: {
    left: -2,
    icon: 'circle',
    itemWidth: 10,
    itemHeight: 10,
  },
  grid: {
    left: 4,
    right: 4,
    top: '16%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        // 每4个字符换行
        // formatter: function (value) {
        //   return value.match(/.{1,5}/g).join('\n'); // 每4字符分割
        // },
        // 调整样式
        interval: 0, // 强制显示所有标签
        rotate: 0,   // 不旋转
        margin: 10,  // 标签与轴的距离
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '问题反馈数',
      type: 'line',
      data: [10, 52, 200, 334, 390, 330, 220]
    },
    {
      name: '问题解决数',
      type: 'line',
      // stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
  ]
}));
</script>

<style scoped lang='scss'></style>