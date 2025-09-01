<template>
  <el-form
    ref="ruleFormRef"
    :model="formData"
    label-position="left"
    label-width="100px"
    :scroll-to-error="true"
    class="dynamic-form"
  >
    <el-form-item
      v-for="field in visibleFields"
      :key="field.name"
      :label="field.label"
      :prop="field.name"
      :rules="getValidationRules(field, formData)"
    >
      <FormField
        :field="field"
        v-model="formData[field.name]"
        :form-data="formData"
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { FormInstance } from "element-plus/es/components/form";
import { computed, ref, watch } from "vue";
import type {
  FormData as FormDataType,
  FormField as FormFieldType,
} from "../formTypes";
import { evaluateConditions } from "../utils/conditionParser";
import { applyLinkage } from "../utils/dataLinkage";
import { getValidationRules } from "../utils/formRules";
import FormField from "./FormField.vue";

const props = defineProps<{
  formSchema: FormFieldType[];
}>();

const emit = defineEmits<{
  (e: "submit", formData: FormDataType): void;
}>();
const ruleFormRef = ref<FormInstance>();
const formData = ref<FormDataType>({});

// 初始化表单数据
const initializeFormData = () => {
  props.formSchema.forEach((field) => {
    formData.value[field.name] = field.defaultValue;
  });
};

// 计算可见字段
const visibleFields = computed(() =>
  props.formSchema.filter((field) =>
    !field.conditions
      ? true
      : evaluateConditions(field.conditions, formData.value)
  )
);

// 表单提交
const handleSubmit = async () => {
  // 验证所有可见字段
  if (!ruleFormRef.value) return;
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      console.log("表单提交成功:", formData.value);
      emit("submit", formData.value);
    } else {
      ElMessage.error("表单验证失败");
    }
  });
};

watch(
  () => props.formSchema,
  () => {
    initializeFormData();
  },
  { deep: true, immediate: true }
);

// 监听表单数据变化，处理联动
watch(
  formData,
  (newVal) => {
    props.formSchema.forEach((field) => {
      if (field.linkage && field.linkage.type === "concatenate") {
        formData.value[field.name] = applyLinkage(field.linkage, null, newVal);
      }
    });
  },
  { deep: true }
);

defineExpose({
  ruleFormRef,
  formData,
  handleSubmit,
});
</script>

<style scoped lang="scss">
.dynamic-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10%;
  row-gap: 16px;
}

:deep .el-form-item {
  .el-input,
  .el-input-number {
    width: 100%;
  }
  .el-form-item__content {
    align-items: flex-start !important;
  }
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>