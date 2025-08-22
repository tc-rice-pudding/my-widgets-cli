<template>
  <div class="time-pick-container">
    <span>时间范围：</span>
    <el-radio-group v-model="state.query.timeType">
      <el-radio v-for="item in state.query.ops" :key="item" :label="item">
        {{ item }}
      </el-radio>
    </el-radio-group>
    <el-date-picker
      v-model="state.query.range"
      :disabled="state.query.timeType != '自定义'"
      type="daterange"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      :disabled-date="disabledDate"
      :popper-append-to-body="false"
      :append-to-body="false"
      popper-class="custom-video-popper"
    />
  </div>
</template>

<script setup lang='ts'>
import dayjs from "dayjs";

interface Props {
  timeRange: string[];
  format: [string, string] | [string];
  limitDays?: number; // 大于 0，开启时间限制
}
const props = withDefaults(defineProps<Props>(), {
  format: () => ["YYYY-MM-DD 00:00:00", "YYYY-MM-DD 23:59:59"],
  limitDays: 0,
});
const emit = defineEmits(["update:timeRange"]);

const state = reactive({
  query: {
    ops: ["全部", "近一个月", "近一周", "自定义"],
    timeType: "全部",
    range: [] as any[],
  },
});

const getRangeTime = (dayRange: number, nowTime = new Date()) => [
  dayjs(nowTime).subtract(dayRange, "day"),
  dayjs(nowTime),
];

const handlerMap = {
  全部: () => [],
  近一个月: () => getRangeTime(30),
  近一周: () => getRangeTime(7),
  自定义: () => state.query.range,
};

const disabledDate = (time) => {
  if (props.limitDays > 0) {
    // 获取今天日期
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 计算 x 天前的日期
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - props.limitDays);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    // 限制选择今天之后的日期和 x 天前的日期
    return (
      time.getTime() > today.getTime() ||
      time.getTime() < thirtyDaysAgo.getTime()
    );
  }
};

watchEffect(() => {
  state.query.range = handlerMap[state.query.timeType]();
  const rangeTime = state.query.range;

  if (rangeTime?.length && props.format?.length) {
    const [startFormat, endFormat] = props.format;
    rangeTime[0] = dayjs(rangeTime[0]).format(startFormat);
    rangeTime[1] = dayjs(rangeTime[1]).format(endFormat ?? startFormat);
  }
  emit("update:timeRange", rangeTime);
});
</script>

<style scoped lang='scss'>
.time-pick-container {
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  justify-content: flex-start;
  overflow: inherit !important;
  height: 56px;
  background: #ffffff;
  border-radius: 4px;
  > span {
    font-weight: 400;
    font-size: 14px;
  }
  :deep .el-radio-group {
    .el-radio {
      margin-right: 20px;
    }
  }
  :deep .el-date-editor {
    max-width: 240px;
  }
}
</style>
<style lang="scss">
.custom-video-popper {
  max-width: 650px !important;
}
</style>