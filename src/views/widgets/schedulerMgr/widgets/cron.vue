<template>
  <el-form-item label="CRON类型" prop="cronType">
    <el-radio-group v-model="props.formInfo.cronType" @change="onChange" :disabled="isDisabled">
      <el-radio v-for="(value, key) in cronTypeMap" :key="key" :value="key">{{
        value
      }}</el-radio>
    </el-radio-group>
  </el-form-item>

  <!-- 简易 -->
  <template v-if="cronTypeMap[props.formInfo.cronType] == '简易类型'">
    <el-form-item
      label="选择任务执行周期"
      prop="period"
      :rules="[
        { required: true, message: '请选择任务执行周期', trigger: 'change' },
      ]"
    >
      <el-tabs
        v-model="props.formInfo.period"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane label="分钟" name="MINUTE" :disabled="isDisabled"/>
        <el-tab-pane label="小时" name="HOUR" :disabled="isDisabled"/>
        <el-tab-pane label="天" name="DAY" :disabled="isDisabled"/>
      </el-tabs>
      <div class="easy-container">
        <label>每隔</label>
        <el-input-number
          v-model="props.formInfo.__interval"
          placeholder="请输入"
          :min="1"
          :precision="0"
          controls-position="right"
          @change="setExpression"
          :disabled="isDisabled"
        />
        <span>{{ periodMap[props.formInfo.period] }}发生一次</span>
      </div>
      <div class="expression-ref">
        <span>表达式</span><span>{{ props.formInfo.expression }}</span>
      </div>
    </el-form-item>
  </template>

  <!-- 高级 -->
  <template v-if="cronTypeMap[props.formInfo.cronType] == '高级设置'">
    <AdvancedSetting v-model:expression="props.formInfo.expression" />
  </template>

  <!-- 手写 -->
  <template v-if="cronTypeMap[props.formInfo.cronType] == '手写cron'">
    <el-form-item
      label="选择任务执行周期"
      prop="expression"
      :rules="[
        { required: true, message: '请输入cron表达式', trigger: 'change' },
      ]"
    >
      <div class="number-container">
        <el-input
          v-model="props.formInfo.expression"
          placeholder="请输入cron表达式"
          :disabled="isDisabled"
        />
        <el-button
          type="primary"
          plain
          @click="getExecuteTimeHandler"
          :disabled="!props.formInfo.expression"
          >校验</el-button
        >
      </div>
    </el-form-item>
    <div class="execute-container">
      <el-icon class="iconfont icon-zhihangshijian" size="18px" />
      <span>最近5次执行时间</span>
    </div>
    <div class="execute-time">
      {{ executeTime.join("  /  ") }}
    </div>
  </template>
</template>

<script setup lang='ts'>
import { dayjs, ElMessage } from "element-plus";
import { useDict } from "../hooks/useDict";
// import { getExecuteTime } from "@/core/api/schedulerMgr";
import AdvancedSetting from "./advancedSetting/index.vue";
import { useCronDisabled } from "../hooks/useCronDisabled";

const props = defineProps({
  formInfo: {
    type: Object,
    required: true,
  },
});

const {isDisabled} =useCronDisabled();
const { scheduleTypeMap, cronTypeMap, periodMap, initDict } = useDict();
const executeTime = ref<string[]>([]);

const onChange = (val) => {
  props.formInfo.expression = "";
  if (cronTypeMap.value[val] == "简易类型") {
    props.formInfo.__interval = 1;
    setExpression();
    if (props.formInfo.period == "") {
      props.formInfo.period = "MINUTE";
    }
  } else if (cronTypeMap.value[props.formInfo.cronType] == "高级设置") {
    props.formInfo.period = "";
    if (typeof props.formInfo.expression == "string") {
      props.formInfo.expression = (props.formInfo.expression||'* * * * * ? ').split(' ');
    }
  } else {
    props.formInfo.period = "";
  }
};

// ----------简易 start---------
const handleClick = () => {
  props.formInfo.__interval = 1;
  setExpression();
};

const setExpression = () => {
  nextTick(() => {
    if (cronTypeMap.value[props.formInfo.cronType] == "简易类型") {
      if (periodMap.value[props.formInfo.period] == "分钟")
        props.formInfo.expression = `0 0/${props.formInfo.__interval} * * * ? *`;
      else if (periodMap.value[props.formInfo.period] == "小时")
        props.formInfo.expression = `0 0 0/${props.formInfo.__interval} * * ? *`;
      else if (periodMap.value[props.formInfo.period] == "天")
        props.formInfo.expression = `0 0 0 1/${props.formInfo.__interval} * ? *`;
    }
  });
};
// ----------简易 end---------

// ----------手写 start---------
const getExecuteTimeHandler = async () => {
  // const { data, code }: any = await getExecuteTime(props.formInfo.expression);
  // if (code == 200) {
  //   executeTime.value = data ?? [];
  //   ElMessage.success("操作成功");
  //   return;
  // }
  // ElMessage.error("操作失败");
};
// ----------手写 end---------

/**
 * 根据【cron表达式】回显出【间隔时间】
 */
watch(
  () => props.formInfo,
  () => {
    if (props.formInfo.expression && !props.formInfo.__interval) {
      if (/0 0 0 1\/(\d+) \* \? \*/.test(props.formInfo.expression)) {
        props.formInfo.__interval = /0 0 0 1\/(\d+) \* \? \*/.exec(
          props.formInfo.expression
        )?.[1];
      }
      if (/0 0 0\/(\d+) \* \* \? \*/.test(props.formInfo.expression)) {
        props.formInfo.__interval = /0 0 0\/(\d+) \* \* \? \*/.exec(
          props.formInfo.expression
        )?.[1];
      }
      if (/0 0\/(\d+) \* \* \* \? \*/.test(props.formInfo.expression)) {
        props.formInfo.__interval = /0 0\/(\d+) \* \* \* \? \*/.exec(
          props.formInfo.expression
        )?.[1];
      }
    }
  },
  { immediate: true, deep: true }
);
</script>

<style scoped lang='scss'>
.expression-ref {
  padding: 0 24px;
  > span {
    font-weight: 600;
    color: #000c;
    line-height: 40px;
    margin-right: 8px;
  }
}
.easy-container {
  display: flex;
  column-gap: 12px;
  width: 100%;
  height: 64px;
  background: #f6f6f6;
  border-radius: 4px;
  align-items: center;
  padding: 0 24px;

  > label {
    font-weight: 400;
    font-size: 14px;
    color: #333333;
    &::before {
      content: "*";
      color: var(--el-color-danger);
    }
  }
  span {
    font-weight: 400;
    font-size: 14px;
    color: #333333;
  }
}
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
  padding-left: 140px;
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
  padding-left: 140px;
  font-weight: 400;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
}

:deep .el-tabs {
  width: 100%;
}
:deep .el-tabs__item {
  height: 32px !important;
  &:nth-of-type(3) {
    padding: 0 10px !important;
  }
  &:nth-of-type(2) {
    padding-right: 10px !important;
  }
  &:nth-of-type(4) {
    padding-left: 10px !important;
  }
}
</style>