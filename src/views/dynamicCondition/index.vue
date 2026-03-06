<template>
  <div class="conditioner">
    <div class="condition-header">
      <div class="name">{{ name }}</div>
      <div class="json">
        <span class="iconfont icon-a-00icon-box"></span>
        <el-button type="primary" link @click="showJson">查看json</el-button>
      </div>
    </div>
    <div class="condition-body">
      <Conditions ref="conditionRef" @result="setCondition" v-bind="$attrs">
        <template #default="item">
          <slot v-bind="item" />
        </template>
      </Conditions>
    </div>

    <el-dialog v-model="jsonVisible" title="JSON预览" width="50%" append-to-body destroy-on-close>
      <JsonViewer :data="jsonData" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import Conditions from "./Conditions.vue";
import JsonViewer from "./JsonViewer.vue";
import { cloneDeep } from "lodash";

const emits = defineEmits(["result"]);

defineProps({
  name: {
    type: String,
    required: true,
  },
});

let jsonData = reactive({});
const jsonVisible = ref(false);
const conditionRef = ref();

/**
 * 处理json格式
 */
const handleJson = (data) => {
  const fn = (obj) => {
    delete obj.id;
    if (obj.items?.length) {
      obj.items.forEach((item) => {
        fn(item);
      });
    }
  };
  let conditions = cloneDeep(data.conditions);
  fn(conditions);
  return conditions;
};

const showJson = () => {
  jsonVisible.value = true;
  jsonData = handleJson(conditionRef.value.state);
};

const setCondition = (condition) => {
  emits("result", handleJson(condition));
};

defineExpose({
  initConditions: (condition) => conditionRef.value?.initConditions(condition),
})
</script>

<style lang="scss" scoped>
.conditioner {
  width: 100%;
  border: 1px solid rgba(217, 217, 217, 1);
  margin-bottom: 20px;

  .condition-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(217, 217, 217, 1);
    padding: 10px 15px;
    color: rgba(0, 0, 0, 0.8);
    font-size: 16px;

    .name {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.8);
      line-height: 22px;
    }

    .json {
      display: flex;
      align-items: center;
      color: #216dd9;
      font-size: 16px;

      .el-button {
        font-size: inherit;
      }
    }
  }

  .condition-body {
    padding: 15px;
  }
}
</style>
