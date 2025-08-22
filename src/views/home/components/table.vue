<template>
  <div class="eChart-table">
    <div class="title">
      <span>{{ props.data.serviceName }}</span>
      <span>
        <el-cascader v-model="date" :options="options" @change="handleChange" />
      </span>
    </div>
    <GlobalEcharts :options="handlerOpt" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import moment from "moment";
import { eChartsList, ServiceCountList } from "@/core/interface/introduction";
const props = defineProps({
  title: {
    type: String,
    default: "语音技术服务",
  },
  data: {
    type: Object,
    default: () => ({} as eChartsList),
  },
});
const handlerOpt = computed(() => {
  console.log(props.data);

  let xData = [] as string[];
  let yData = [] as string[];
  props.data.serviceCount.map((item: ServiceCountList) => {
    xData.push(item.time);
    yData.push(item.count);
  });
  return {
    xAxis: {
      type: "category",
      data: xData,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: yData,
        type: "line",
      },
    ],
  };
});
const emit = defineEmits(["selectTime"]);
const dateType = {
  "0.5": "",
  "2": "isHour",
  "6": "isDay",
  "24": "isDay",
};
const date = ref("0.5");
const options = [
  {
    label: "最近30分钟",
    value: "0.5",
  },
  {
    label: "最近2小时",
    value: "2",
  },
  {
    label: "最近6小时",
    value: "6",
  },
  {
    label: "最近24小时",
    value: "24",
  },
];

/**
 * 选择框
 */
const handleChange = (value: string) => {
  emit("selectTime", {
    serviceId: props.data!.serviceId,
    queryType: dateType[value],
    st: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    et: moment().subtract(+value, "hours").format("YYYY-MM-DD HH:mm:ss"),
  });
};
</script>

<style lang="scss" scoped>
.eChart-table {
  max-width: 45%;
  padding: 20px;
  height: 302px;
  background: rgba(245, 250, 255, 0.8);
  border-radius: 4px;
  border: 1px solid;
  border-image: linear-gradient(
      137deg,
      rgba(255, 255, 255, 1),
      rgba(192, 215, 255, 1)
    )
    1 1;
  backdrop-filter: blur(3px);
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 40px;
  }
}
</style>
