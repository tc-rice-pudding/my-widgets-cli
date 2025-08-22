<template>
  <el-form :label-width="labelWidth">
    <template v-for="item in props.formFieldsOptions" :key="item.field">
      <el-form-item :label="item.label + ''">
        {{ formFieldsValue[item.field] }}
      </el-form-item>
    </template>
  </el-form>
</template>
<script lang="ts" setup>
import { FormInputInfo } from "@/core/interface/common";

const props = defineProps({
  formFieldsOptions: {
    require: true,
    type: Array as PropType<FormInputInfo[]>,
    default: () => [],
  },
  formFieldsValue: {
    require: false,
    type: Object as PropType<any>,
    default: () => {},
  },
  labelWidth: {
    require: false,
    type: String,
    default: "90px",
  },
});
const state = reactive({
  formValue: {} as any,
});
// watch(
//   () => props.formFieldsValue,
//   (newVal) => {
//     console.log("newVal,", newVal);
//   },
//   {
//     deep: true,
//     immediate: true,
//   }
// );
</script>
