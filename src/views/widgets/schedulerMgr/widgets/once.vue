<template>
  <el-form-item label="任务起始时间" prop="expression" :rules="[
    { required: true, message: '请选择任务起始时间', trigger: 'change' },
  ]">
    <template #label>
      <div class="label-container">
        <label>任务起始时间</label>
        <el-tooltip class="box-item" effect="dark" placement="bottom-start">
          <template #content>
            用于指定任务第一次执行的时间，如果不指定第一次执行时间由触<br />发器根据系统当前时间计算所得
          </template>
          <el-icon class="iconfont icon-wenhao" size="16px" />
        </el-tooltip>
      </div>
    </template>
    <el-date-picker v-model="props.formInfo.expression" type="datetime" placeholder="请选择任务起始时间"
      format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" :disabled="isDisabled"
      :disabled-date="disabledDate" :disabled-hours="disabledHours" :disabled-minutes="disabledMinutes"
      :disabled-seconds="disabledSeconds" />
  </el-form-item>
  <div class="execute-container">
    <el-icon class="iconfont icon-zhihangshijian" size="18px" />
    <span>计划执行时间</span>
  </div>
  <div class="execute-time">
    {{ props.formInfo.expression || "-" }}
  </div>
</template>

<script setup lang='ts'>
import { useCronDisabled } from '../hooks/useCronDisabled';

const props = defineProps({
  formInfo: {
    type: Object,
    required: true,
  },
});
const { isDisabled } = useCronDisabled();

const now = ref(new Date())

// 1. 禁用今天之前的日期
const disabledDate = (time) => {
  const today = new Date(now.value.getFullYear(), now.value.getMonth(), now.value.getDate())
  return time.getTime() < today.getTime()
}

// 2. 如果是今天，禁用已经过去的小时
const disabledHours = () => {
  const hours = []
  const currentHour = now.value.getHours()

  // 如果是今天，禁用当前小时之前的所有小时
  if (props.formInfo.expression) {
    const selectedDate = new Date(props.formInfo.expression)
    const today = new Date(now.value.getFullYear(), now.value.getMonth(), now.value.getDate())
    const selectedDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())

    if (selectedDay.getTime() === today.getTime()) {
      for (let i = 0; i < currentHour; i++) {
        hours.push(i)
      }
    }
  }
  return hours
}

// 3. 如果是今天且是当前小时，禁用已经过去的分钟
const disabledMinutes = (selectedHour) => {
  const minutes = []
  const currentHour = now.value.getHours()
  const currentMinute = now.value.getMinutes()

  if (props.formInfo.expression) {
    const selectedDate = new Date(props.formInfo.expression)
    const today = new Date(now.value.getFullYear(), now.value.getMonth(), now.value.getDate())
    const selectedDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())

    if (selectedDay.getTime() === today.getTime() && selectedHour === currentHour) {
      for (let i = 0; i < currentMinute; i++) {
        minutes.push(i)
      }
    }
  }
  return minutes
}

// 4. 如果是今天、当前小时、当前分钟，禁用已经过去的秒数
const disabledSeconds = (selectedHour, selectedMinute) => {
  const seconds = []
  const currentHour = now.value.getHours()
  const currentMinute = now.value.getMinutes()
  const currentSecond = now.value.getSeconds()

  if (props.formInfo.expression) {
    const selectedDate = new Date(props.formInfo.expression)
    const today = new Date(now.value.getFullYear(), now.value.getMonth(), now.value.getDate())
    const selectedDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())

    if (selectedDay.getTime() === today.getTime() &&
      selectedHour === currentHour &&
      selectedMinute === currentMinute) {
      for (let i = 0; i < currentSecond; i++) {
        seconds.push(i)
      }
    }
  }
  return seconds
}
</script>

<style scoped lang='scss'>
.label-container {

  // > label {
  //   &::before {
  //     content: "*";
  //     color: var(--el-color-danger);
  //     margin-right: 4px;
  //   }
  // }
  >i {
    margin-left: 4px;
    cursor: pointer;
  }
}

.execute-container {
  width: 100%;
  padding-left: 140px;

  .icon-zhihangshijian {
    color: #216dd9;
    margin-right: 4px;
  }

  >span {
    font-weight: 400;
    font-size: 16px;
    color: #216dd9;
  }
}

.execute-time {
  padding-left: 140px;
  font-weight: 400;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
}
</style>