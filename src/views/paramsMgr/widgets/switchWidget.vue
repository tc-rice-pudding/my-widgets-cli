<template>
  <el-switch
    v-model="props.row[props.field]"
    :active-value="1"
    :inactive-value="0"
    @change="onChange"
  />
</template>

<script setup lang='ts'>
// import { updateSysConfig } from "@/core/api/applicationMgr";
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
  console.log(props.row[props.field]);
  // const { data, code }: any = await updateSysConfig(props.row);
  // if (code == 200) {
  //   ElMessage.success("操作成功");
  //   emits("changeCB");
  //   return;
  // }
  // ElMessage.error("操作失败");
};
</script>

<style scoped lang='scss'>
</style>