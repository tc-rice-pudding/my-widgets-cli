<template>
  <GlobalEcharts :options="barOps" />
</template>

<script setup lang='ts'>
const rickStatData = ref<any>([
  {
    "label": "",
    "tableRows": "340",
    "tableSizeBytes": "48"
  },
  {
    "label": "审批-审计厂商配置表",
    "tableRows": "3",
    "tableSizeBytes": "16"
  },
  {
    "label": "审批-认证配置表",
    "tableRows": "4",
    "tableSizeBytes": "16"
  },
  {
    "label": "审批-权限配置表",
    "tableRows": "4",
    "tableSizeBytes": "16"
  },
  {
    "label": "",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "",
    "tableRows": "9",
    "tableSizeBytes": "16"
  },
  {
    "label": "业务冲突策略",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "回调发送日志",
    "tableRows": "43",
    "tableSizeBytes": "64"
  },
  {
    "label": "数字证书管理表",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "审批操作记录",
    "tableRows": "98",
    "tableSizeBytes": "96"
  },
  {
    "label": "组织机构表",
    "tableRows": "2565",
    "tableSizeBytes": "1.02"
  },
  {
    "label": "审批第三方厂商表",
    "tableRows": "6",
    "tableSizeBytes": "16"
  },
  {
    "label": "",
    "tableRows": "3",
    "tableSizeBytes": "16"
  },
  {
    "label": "审批流程",
    "tableRows": "11",
    "tableSizeBytes": "112"
  },
  {
    "label": "流程模板代理人配置",
    "tableRows": "32",
    "tableSizeBytes": "16"
  },
  {
    "label": "流程高级选项推送配置",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "",
    "tableRows": "6",
    "tableSizeBytes": "16"
  },
  {
    "label": "推送第三方配置（同级、父级、第三方等）",
    "tableRows": "3",
    "tableSizeBytes": "16"
  },
  {
    "label": "",
    "tableRows": "2",
    "tableSizeBytes": "16"
  },
  {
    "label": "",
    "tableRows": "2",
    "tableSizeBytes": "16"
  },
  {
    "label": "",
    "tableRows": "10",
    "tableSizeBytes": "16"
  },
  {
    "label": "风险日志",
    "tableRows": "6",
    "tableSizeBytes": "16"
  },
  {
    "label": "通用风险策略",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "角色定义表",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "角色定义表",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "角色定义表",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "风险信息",
    "tableRows": "6",
    "tableSizeBytes": "16"
  },
  {
    "label": "",
    "tableRows": "10",
    "tableSizeBytes": "16"
  },
  {
    "label": "辽宁签章失败回调记录",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "签章记录",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "签名厂商配置",
    "tableRows": "1",
    "tableSizeBytes": "16"
  },
  {
    "label": "审批-业务安全策略配置",
    "tableRows": "2",
    "tableSizeBytes": "16"
  },
  {
    "label": "系统字典表",
    "tableRows": "107",
    "tableSizeBytes": "48"
  },
  {
    "label": "系统分组",
    "tableRows": "19",
    "tableSizeBytes": "16"
  },
  {
    "label": "表格编号",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "审批申请",
    "tableRows": "28",
    "tableSizeBytes": "176"
  },
  {
    "label": "审批任务记录表\r\n\r\n",
    "tableRows": "51",
    "tableSizeBytes": "16"
  },
  {
    "label": "审批单任务对应表格编号",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "",
    "tableRows": "22",
    "tableSizeBytes": "16"
  },
  {
    "label": "",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "用户信息表",
    "tableRows": "48695",
    "tableSizeBytes": "9.02"
  },
  {
    "label": "",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "回调发送日志",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "审计发送日志\r\n\r\n",
    "tableRows": "121",
    "tableSizeBytes": "144"
  },
  {
    "label": "",
    "tableRows": "0",
    "tableSizeBytes": "16"
  },
  {
    "label": "",
    "tableRows": "7498",
    "tableSizeBytes": "11.52"
  },
  {
    "label": "审批人员接收消息记录",
    "tableRows": "116",
    "tableSizeBytes": "96"
  },
  {
    "label": "",
    "tableRows": "0",
    "tableSizeBytes": "16"
  }
]);

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const dm = decimals || 2;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const fixPercentNumber = (val: number, decimals = 2): string => {
  return (val * 100).toFixed(decimals) + "%";
};

const toThousandMark = (num: any, decimal: number = 2) => {
  if (!num) return "0";
  let result: string[] = [];
  const list = String(num).split("");
  if (list.length < 5) {
    // 小于1万，千分符
    list.reverse().forEach((item, index) => {
      result.push(item);
      if (index > 0 && index < list.length - 1 && (index + 1) % 3 === 0) {
        result.push(",");
      }
    });
    return result.reverse().join("");
  } else if (list.length >= 5 && list.length < 9) {
    // 大于1万 小于1亿
    return (Number(num) / 10000).toFixed(decimal) + " 万";
  } else {
    // 大于1亿
    return (Number(num) / 100000000).toFixed(decimal) + " 亿";
  }
};

const barOps = computed(() => ({
  color: ['#4887e0', '#73deb3'],
  title: {
    text: '单位：行/数据量',
    textStyle: {
      fontWeight: 400,
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)'
    },
    right: '1%',
    top: '0%',
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
          <p style='line-height: 24px;font-weight: 500; font-size: 14px; color: #FFFFFF;'>${args?.[0]?.axisValueLabel}</p>
          <p style='line-height: 24px;'>${args?.[0]?.marker}<span style="padding: 0 30px 0 10px; display:inline-block; width: 140px;">${args?.[0]?.seriesName}</span><span>${toThousandMark(args?.[0]?.value) ?? '-'}</span></p>
          <p style='line-height: 24px;'>${args?.[1]?.marker}<span style="padding: 0 30px 0 10px; display:inline-block; width: 140px;">${args?.[1]?.seriesName}</span><span>${formatBytes(args?.[1]?.value) ?? '-'}</span></p>
        </div>
      `;
    },
  },
  legend: {
    left: -2,
    itemWidth: 14,
    itemHeight: 10,
  },
  grid: {
    left: 4,
    right: 4,
    top: '14%',
    bottom: 0,
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: rickStatData.value.map(it => it.label),
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        interval: 0, // 强制显示所有标签
        rotate: 45, // 已旋转45°
        formatter: function (value) {
          const maxLength = 6; // 限制最大字符数（根据需求调整）
          if (value.length > maxLength) {
            return value.slice(0, maxLength) + '...'; // 截断并添加省略号
          }
          return value;
        },
        align: 'right', // 旋转后文字右对齐，避免偏移
        verticalAlign: 'middle', // 垂直居中，优化视觉
        fontSize: 11 // 适当缩小字体，减少占用空间
      },
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '',
      position: 'left',
      axisLabel: {
        formatter: (value) => toThousandMark(value, 2)
      }
    },
    {
      type: 'value',
      name: '',
      position: 'right',
      axisLabel: {
        formatter: (value) => formatBytes(value, 2)
      }
    }
  ],
  series: [
    {
      name: '表行数量',
      type: 'bar',
      barMaxWidth: 34,
      yAxisIndex: 0, // 关联到第一个 Y 轴
      data: rickStatData.value.map(it => ({ value: it.tableRows, ...it })),
      barMinHeight: 10,
    },
    {
      name: '表数据量',
      type: 'bar',
      barMaxWidth: 34,
      data: rickStatData.value.map(it => ({ value: it.tableSizeBytes, ...it })),
      yAxisIndex: 1, // 关联到第二个 Y 轴
      barMinHeight: 10,
    }
  ]
}));
</script>

<style scoped lang='scss'></style>