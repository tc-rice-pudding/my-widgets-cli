<template>
  <GlobalEcharts :options="barOps" />
</template>

<script setup lang='ts'>
const barOps = computed(() => ({
  xAxis: {
    type: 'category',
    data: ['18:44', '18:56', '19:08', '19:20', '19:32', '19:44', '19:56'],
    axisLine: {
      lineStyle: {
        color: '#ddd' // x轴线颜色（表格横向底线）
      }
    },
    axisTick: {
      show: false
    },
    boundaryGap: false, // 保持x轴完整展示
    axisLabel: {
      interval: 0,
      color: '#666' // 标签颜色加深，适配表格背景
    },
    splitLine: {
      show: true, // 显示x轴纵向分割线（表格竖线）
      lineStyle: {
        color: '#eee', // 竖线颜色，与横向网格线一致
        width: 1
      }
    }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 18,
    interval: 3,
    axisLabel: {
      formatter: '{value}KB/S',
      color: '#666'
    },
    axisLine: {
      show: false
    },
    splitLine: {
      show: true, // 显示y轴横向分割线（表格横线）
      lineStyle: {
        color: '#eee',
        width: 1
      }
    }
  },
  series: [
    {
      type: 'line',
      smooth: false,
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(244, 250, 245, 0.8)' // 面积上半部分透明度
          }, {
            offset: 1, color: 'rgba(244, 250, 245, 0.5)' // 面积下半部分透明度（适配表格）
          }]
        }
      },
      lineStyle: {
        color: '#6bdcaf',
        width: 2
      },
      itemStyle: {
        color: '#6bdcaf'
      },
      emphasis: {
        areaStyle: {
          color: 'rgba(244, 250, 245, 0.9)'
        },
        lineStyle: {
          color: '#6bdcaf',
          width: 2
        },
        itemStyle: {
          color: '#6bdcaf',
          borderColor: '#fff',
          borderWidth: 2
        }
      },
      data: [3, 9, 15, 3, 6, 9, 12],
      z: 10 // 确保线条和面积在表格上方显示
    }
  ],
  grid: {
    left: 20,
    right: 20,
    bottom: 0,
    top: '10%',
    containLabel: true,
    clip: false
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderColor: 'rgba(0,0,0,0.6)',
    formatter(args) {
      return `
        <div style='color: rgba(255,255,255,0.8);'>
          <p style='line-height: 24px;'>${args?.[0]?.marker}<span style="padding: 0 30px 0 10px; display:inline-block; width: 140px;">${args?.[0]?.axisValueLabel}</span><span>${args?.[0]?.value ?? '-'} KB/S</span></p>
        </div>
      `;
    },
  },
  backgroundColor: '#fff' // 图表整体背景色，让表格更清晰
}));
</script>

<style scoped lang='scss'></style>