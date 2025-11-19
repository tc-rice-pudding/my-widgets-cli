<template>
  <el-form-item label="选择任务执行周期" prop="expression">
    <template #label>
      <span style="color: red">*</span>
      <span> 选择任务执行周期 </span>
    </template>

    <el-tabs v-model="state.activeTab" class="demo-tabs">
      <el-tab-pane v-for="(it, inx) in state.tabNameList" :key="inx" :label="it" :name="inx" :disabled="isDisabled"/>
    </el-tabs>

    <div class="component-item-container">
      <AS.second v-show="state.activeTab == 0" v-model:cron="props.expression" :inx="0" />
      <AS.minute v-show="state.activeTab == 1" v-model:cron="props.expression" :inx="1" />
      <AS.hour v-show="state.activeTab == 2" v-model:cron="props.expression" :inx="2" />
      <AS.day v-show="state.activeTab == 3" v-model:cron="props.expression" :inx="3" />
      <AS.month v-show="state.activeTab == 4" v-model:cron="props.expression" :inx="4" />
      <AS.week v-show="state.activeTab == 5" v-model:cron="props.expression" :inx="5" />
      <AS.year v-show="state.activeTab == 6" v-model:cron="props.expression" :inx="6" />
    </div>

    <div class="time-expression-container">
      <h5>时间表达式</h5>
      <ul>
        <li v-for="(it,inx) in state.tabNameList" :key="inx"><span>{{ props.expression[inx] }}</span><label>{{ it }}</label></li>
      </ul>
    </div>

    <div class="expression-ref">
      <span>表达式</span><span>{{ Array.isArray(props.expression)?props.expression.join(' '): props.expression }}</span>
    </div>

    <div class="execute-container">
      <el-icon class="iconfont icon-zhihangshijian" size="18px" />
      <span>最近5次执行时间</span>
    </div>
    <div class="execute-time">
      {{ state.executeTime.join(" / ") || "-" }}
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
// import { getExecuteTime } from "@/core/api/schedulerMgr";
import AS from "./components";
import { useCronDisabled } from "../../hooks/useCronDisabled";
const props = defineProps({
  expression: {
    type: Array,
    required: true,
  },
});
const {isDisabled} =useCronDisabled();
const state = reactive({
  activeTab: 0,
  executeTime: [],
  tabNameList: ["秒","分钟","小时","日","月","周","年"],
});

watch(()=>props.expression,async()=>{
  if(!props.expression) return;

  // try {
  //   const { data, code }: any = await getExecuteTime(Array.isArray(props.expression)?props.expression.filter(it=>it!='').join(' '):props.expression);
  //   if (code == 200) {
  //     state.executeTime = data ?? [];
  //     return;
  //   }
  // } catch (error) {
  //   state.executeTime=[];
  // }
},{immediate:true,deep:true});
</script>

<style scoped lang="scss">
.component-item-container {
  width: 100%;
}

:deep .el-tabs {
  width: 100%;

  .el-tabs__item {
    height: 32px !important;
    padding: 0 10px;

    &:first-of-type {
      padding-left: 0 !important;
    }

    &:last-of-type {
      padding-right: 0 !important;
    }
  }
}

.time-expression-container {
  width: auto;
  height: 89px;
  background: #F6F6F6;
  border-radius: 4px;
  padding: 0 20px 0 16px;
  >h5{
    font-weight: 400;
    font-size: 14px;
    color: rgba(0,0,0,0.8);
    padding: 6px 0 5px;
  }
  >ul{
    width: 100%;
    display: flex;
    column-gap: 8px;
    li{
      min-width: 72px;
      height: 32px;
      background: #FFFFFF;
      border-radius: 2px;
      border: 1px solid #D9D9D9;
      font-weight: 400;
      font-size: 14px;
      color: rgba(0,0,0,0.8);
      display: flex;
      justify-content: space-between;
      column-gap: 8px;
      padding: 0 8px
    }
  }
}

.expression-ref {
  width: 100%;
  >span {
    font-weight: 600;
    color: #000c;
    line-height: 40px;
    margin-right: 8px;
  }
}

.execute-container {
  width: 100%;

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
  font-weight: 400;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
}
</style>