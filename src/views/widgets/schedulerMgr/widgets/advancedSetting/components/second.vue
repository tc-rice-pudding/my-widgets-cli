<template>
  <el-radio-group class="corn-item-radio-group" v-model="state.cronActive"
    @change="(cronActive) => handlerMap[cronActive]()" :disabled="isDisabled">
    <template v-if="props.unit == '年'">
      <el-radio :value="4"> 不填，允许的通配符[, - * /] </el-radio>
      <el-radio :value="0"> 每年 </el-radio>
    </template>
    <template v-else-if="props.unit == '日'">
      <el-radio :value="0"> 日，允许的通配符[, - * ? / L W] </el-radio>
      <el-radio :value="5"> 不指定 </el-radio>
    </template>
    <template v-else-if="props.unit == '周'">
      <el-radio :value="0"> 周，允许的通配符[, - * ? / L #] </el-radio>
      <el-radio :value="5"> 不指定 </el-radio>
    </template>
    <template v-else>
      <el-radio :value="0"> {{ props.unit }}，允许的通配符[, - * /] </el-radio>
    </template>

    <template v-if="props.unit == '周'">
      <el-radio :value="1">
        <span>周期从</span>
        <el-select v-model="state.rangeStart" placeholder="请选择" @change="handlerMap[1]" style="width: 180px;" :disabled="isDisabled">
          <el-option v-for="it in state.weekOps" :key="it.value" :value="it.value" :label="it.label" />
        </el-select>
        <span>-</span>
        <el-select v-model="state.rangeEnd" placeholder="请选择" @change="handlerMap[1]" style="width: 180px;" :disabled="isDisabled">
          <el-option v-for="it in state.weekOps" :key="it.value" :value="it.value" :label="it.label" />
        </el-select>
      </el-radio>
      <el-radio :value="8">
        <span>第</span>
        <el-input-number v-model="state.weekWhichOne" placeholder="请输入" :min="1" :max="4" :precision="0"
          controls-position="right" @change="handlerMap[8]" :disabled="isDisabled"/>
        <span>周的</span>
        <el-select v-model="state.weekWhichweek" placeholder="请选择" @change="handlerMap[8]" style="width: 180px;" :disabled="isDisabled">
          <el-option v-for="it in state.weekOps" :key="it.value" :value="it.value" :label="it.label" />
        </el-select>
      </el-radio>
      <el-radio :value="9">
        <span>本月最后一个</span>
        <el-select v-model="state.weekLast" placeholder="请选择" @change="handlerMap[9]" style="width: 180px;" :disabled="isDisabled">
          <el-option v-for="it in state.weekOps" :key="it.value" :value="it.value" :label="it.label" />
        </el-select>
      </el-radio>
      <el-radio :value="3">
        <span>指定</span>
        <el-select v-model="state.selectVal" placeholder="可多选" multiple collapse-tags collapse-tags-tooltip
          @change="handlerMap[3]" style="width: 180px" :disabled="isDisabled">
          <el-option v-for="it in state.weekOps" :key="it.value" :value="it.value" :label="it.label" />
        </el-select>
      </el-radio>
    </template>
    <template v-else>
      <el-radio :value="1">
        <span>周期从</span>
        <el-input-number v-model="state.rangeStart" placeholder="请输入" :min="rangeStartMin" :precision="0"
          controls-position="right" @change="handlerMap[1]" :disabled="isDisabled"/>
        <span>-</span>
        <el-input-number v-model="state.rangeEnd" placeholder="请输入" :min="rangeEndMin" :precision="0"
          controls-position="right" @change="handlerMap[1]" :disabled="isDisabled"/>
        <span>{{ props.unit }}</span>
      </el-radio>
      <el-radio :value="2">
        <span>从</span>
        <el-input-number v-model="state.splitStart" placeholder="请输入" :min="splitStartMin" :precision="0"
          controls-position="right" @change="handlerMap[2]" :disabled="isDisabled"/>
        <span>{{ props.unit }}开始，每</span>
        <el-input-number v-model="state.splitEnd" placeholder="请输入" :min="splitEndMin" :precision="0"
          controls-position="right" @change="handlerMap[2]" :disabled="isDisabled"/>
        <span>{{ props.unit }}执行一次</span>
      </el-radio>
    </template>

    <template v-if="props.unit == '日'">
      <el-radio :value="6">
        <span>每月</span>
        <el-input-number v-model="state.recentVal" placeholder="请输入" :min="1" :max="31" :precision="0"
          controls-position="right" @change="handlerMap[6]" :disabled="isDisabled"/>
        <span>号最近的那个工作日</span>
      </el-radio>
      <el-radio :value="7">本月最后一天</el-radio>
    </template>

    <template v-if="props.unit == '周'"></template>
    <template v-else>
      <el-radio :value="3">
        <span>指定</span>
        <el-select v-model="state.selectVal" placeholder="可多选" multiple collapse-tags collapse-tags-tooltip
          @change="handlerMap[3]" style="width: 180px" :disabled="isDisabled">
          <el-option v-for="it in props.selectOps" :key="it" :value="it">{{
            it
          }}</el-option>
        </el-select>
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script setup lang="ts">
import { useCronDisabled } from '../../../hooks/useCronDisabled';

const props = defineProps({
  cron: {
    type: Array<string>,
    required: true,
  },
  inx: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    default: "秒",
  },
  selectOps: {
    type: Array<number>,
    default: new Array(60).fill(0).map((it, inx) => inx),
  },
});

const {isDisabled} =useCronDisabled();
const state = reactive({
  cronActive: 0,
  rangeStart: 0,
  rangeEnd: 1,
  splitStart: 0,
  splitEnd: 1,
  selectVal: [props.unit == '周' ? 2 : props.selectOps[0]],
  recentVal: 1,
  weekWhichOne: 1,
  weekWhichweek: 2,
  weekLast: 2,
  weekOps: [
    { label: '星期一', value: 2 },
    { label: '星期二', value: 3 },
    { label: '星期三', value: 4 },
    { label: '星期四', value: 5 },
    { label: '星期五', value: 6 },
    { label: '星期六', value: 7 },
    { label: '星期日', value: 1 },
  ],
});

const rangeStartMin = computed(() => {
  let min = 0;
  if (props.unit == "年") min = props.selectOps[0];
  if (props.unit == "日") min = 1;
  return min;
});
const rangeEndMin = computed(() => {
  let min = Math.max(1, state.rangeStart);
  if (props.unit == "年") min = Math.max(props.selectOps[0], state.rangeStart);
  if (props.unit == "日") min = Math.max(2, state.rangeStart);
  return min;
});
const splitStartMin = computed(() => {
  let min = 0;
  if (props.unit == "年") props.selectOps[0];
  if (props.unit == "日") min = 1;
  return min;
});
const splitEndMin = computed(() => {
  let min = Math.max(1, state.splitStart);

  if (props.unit == "年") min = 1;
  if (props.unit == "日") min = 1;
  return min;
});

const handlerMap = {
  0: () => (props.cron[props.inx] = "*"),
  1: () => (props.cron[props.inx] = `${state.rangeStart}-${state.rangeEnd}`),
  2: () => (props.cron[props.inx] = `${state.splitStart}/${state.splitEnd}`),
  3: () => (props.cron[props.inx] = state.selectVal.toString()),
  4: () => (props.cron[props.inx] = ""),
  5: () => (props.cron[props.inx] = "?"),
  6: () => (props.cron[props.inx] = `${state.recentVal}W`),
  7: () => (props.cron[props.inx] = "L"),
  8: () => (props.cron[props.inx] = `${state.weekWhichweek}#${state.weekWhichOne}`),
  9: () => (props.cron[props.inx] = `${state.weekLast}L`),
};

watch(
  () => props.cron[props.inx],
  () => {
    if (!Array.isArray(props.cron)) return;
    const currCron = props.cron[props.inx];
    if (currCron.includes("*")) {
      state.cronActive = 0;
    } else if (currCron.includes("-")) {
      state.cronActive = 1;
      [state.rangeStart, state.rangeEnd] = currCron
        .split("-")
        .map((it) => Number(it));
    } else if (currCron.includes("/")) {
      state.cronActive = 2;
      [state.splitStart, state.splitEnd] = currCron
        .split("/")
        .map((it) => Number(it));
    } else if (currCron == "") {
      state.cronActive = 4;
    } else if (currCron.includes("?")) {
      state.cronActive = 5;
    } else if (currCron.includes("W")) {
      state.cronActive = 6;
    } else if (currCron == "L") {
      state.cronActive = 7;
    } else if (currCron.includes("#")) {
      state.cronActive = 8;
      [state.weekWhichweek, state.weekWhichOne] = currCron
        .split("#")
        .map((it) => Number(it));
    } else if (currCron.includes("L")) {
      state.cronActive = 9;
      state.weekLast = +(/(\d)L/.exec(currCron)![1]);
    } else {
      state.cronActive = 3;
      state.selectVal = currCron.split(",").map((it) => Number(it));
    }
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss">
.corn-item-radio-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 16px;
  padding-bottom: 16px !important;

  .el-radio {
    .el-radio__label {
      display: inline-flex;
      column-gap: 8px;
    }
  }
}
</style>
