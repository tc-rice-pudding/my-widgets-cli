<template>
  <GlobalEcharts :options="pieOps" />
</template>
<script setup lang='ts'>
import ColorHash from "color-hash";
const colorHash = new ColorHash({
  saturation: 0.8,
  lightness: 0.5,
});

const pieOps = computed(() => ({
  title: [{
    text: '系统评价占比',
    textStyle: {
      fontWeight: 500,
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.8)'
    },
    left: -4
  },
  {
    text: '单位: 次',
    textStyle: {
      fontWeight: 400,
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)'
    },
    right: 34
  }],
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow'
    },
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderColor: 'rgba(0,0,0,0.6)',
    formatter(args) {
      const { name, marker, value, data: { list = [] } } = args ?? {};
      let strList: string[] = [];
      return `
        <div style='color: rgba(255,255,255,0.8);'>
          <p style='line-height: 24px;'><span style="margin-right: 30px">${name}</span><span>${value}个</span></p>
          ${list.map(it => {
        strList = [];
        strList.push("<p style='line-height: 24px; display: flex ;align-items: center; min-width: 140px;'>");
        strList.push('<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' + colorHash.hex(it) + ';"></span>');
        strList.push("<span>" + it + "</span>");
        strList.push("</p>");
        return strList.join('');
      }).join('')
        }
        </div>
      `;
    },
    position: function (point, params, dom, rect, size) {
      // 自定义位置逻辑
      return [Math.min(point[0], size.viewSize[0] - size.contentSize[0]),
      Math.min(point[1], size.viewSize[1] - size.contentSize[1])];
    }
  },
  legend: {
    top: '10%',
    left: -2,
    icon: 'circle',
    itemWidth: 10,
    itemHeight: 10,
  },
  grid: {
    top: '30%',
    bottom: '3%',
    containLabel: true
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['25%', '45%'],
      center: ['49%', '60%'],
      data: [
        { value: 48, name: '优秀', list: ['人口数据审查系统', '数据流转审计系统', '接处警系统', '警务党建'] },
        { value: 7, name: '良好', list: ['人口数据审查系统', '数据流转审计系统', '警务党建'] },
        { value: 58, name: '不理想', list: ['接处警系统'] },
        { value: 48, name: '很糟糕', list: ['数据流转审计系统', '警务党建'] },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        formatter: '{t|{b}}\n {s|{c}个} {s|{d}}%',
        overflow: 'breakAll',
        rich: {
          t: {
            color: 'rgba(0,0,0,0.8)',
            fontWeight: 500,
            fontSize: 12,
          },
          s: {
            color: 'rgba(0,0,0,0.6)',
            fontWeight: 500,
            fontSize: 12,
          },
        }
      }
    }
  ]
}));
</script>

<style scoped lang='scss'></style>