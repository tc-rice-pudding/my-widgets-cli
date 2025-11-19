<template>
  <el-form-item label="运行速度" prop="expression">
    <div class="number-container">
      <span>每隔</span>
      <el-input-number
        v-model="props.formInfo.expression"
        placeholder="请输入"
        :min="1"
        :precision="0"
        controls-position="right"
        :disabled="isDisabled"
      />
      <span>s运行一次</span>
    </div>
    <div class="execute-container">
      <el-icon class="iconfont icon-zhihangshijian" size="18px" />
      <span>运行速度</span>
    </div>
    <div class="execute-time">
      {{ executeTime.join("  /  ") }}
    </div>
  </el-form-item>
</template>

<script setup lang='ts'>
import { dayjs } from "element-plus";
import { useCronDisabled } from "../hooks/useCronDisabled";

const props = defineProps({
  formInfo: {
    type: Object,
    required: true,
  },
});
const {isDisabled} =useCronDisabled();
const executeTime = ref<string[]>([]);

watch(
  () => props.formInfo,
  () => {
    props.formInfo.period = "SECOND";
    if(isNaN(Number(props.formInfo.expression))){
      props.formInfo.expression = 1;
    }
    executeTime.value = new Array(5)
      .fill("")
      .map((it,inx) =>
        dayjs()
          .add(props.formInfo.expression*(inx+1), "second")
          .format("YYYY-MM-DD HH:mm:ss")
      );
  },
  { immediate: true, deep: true }
);
</script>

<style scoped lang='scss'>
.number-container {
  display: flex;
  column-gap: 12px;
  .span {
    font-weight: 400;
    font-size: 14px;
    color: #333333;
  }
}
.execute-container {
  margin-top: 20px;
  width: 100%;
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
  font-weight: 400;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
}
</style>