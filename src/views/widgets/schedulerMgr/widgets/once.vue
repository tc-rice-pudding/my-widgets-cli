<template>
  <el-form-item
    label="任务起始时间"
    prop="expression"
    :rules="[
      { required: true, message: '请选择任务起始时间', trigger: 'change' },
    ]"
  >
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
    <el-date-picker
      v-model="props.formInfo.expression"
      type="datetime"
      placeholder="请选择任务起始时间"
      format="YYYY-MM-DD HH:mm:ss"
      value-format="YYYY-MM-DD HH:mm:ss"
      :disabled="isDisabled"
    />
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
const {isDisabled} =useCronDisabled();
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
  > i {
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
  > span {
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