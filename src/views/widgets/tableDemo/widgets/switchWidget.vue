<template>
  <el-switch
    v-model="props.row[props.field]"
    :active-value="1"
    :inactive-value="0"
    @change="onChange"
  />
</template>

<script setup lang='ts'>
import { ElMessage } from "element-plus";

const emits = defineEmits(["changeCB"]);
const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
});

const onChange = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
  ElMessage.success("操作成功...");
  emits("changeCB");
};
</script>

<style scoped lang='scss'>
</style>