<template>
  <el-input
    v-if="field.type === 'input'"
    v-model="formData[field.name]"
    :placeholder="`请输入${field.label}`"
    clearable
  />

  <el-input
    v-else-if="field.type === 'password'"
    type="password"
    v-model="formData[field.name]"
    :placeholder="`请输入${field.label}`"
    clearable
  />

  <el-input-number
    v-else-if="field.type === 'number'"
    v-model="formData[field.name]"
    controls-position="right"
    :placeholder="`请输入${field.label}`"
    clearable
  />

  <el-date-picker
    v-else-if="field.type === 'date'"
    v-model="formData[field.name]"
    type="date"
    :placeholder="`请选择${field.label}`"
    format="YYYY-MM-DD"
    value-format="YYYY-MM-DD"
  />
  <el-time-picker
    v-else-if="field.type === 'time'"
    v-model="formData[field.name]"
    arrow-control
    :placeholder="`请选择${field.label}`"
    format="hh:mm:ss"
    value-format="hh:mm:ss"
  />
  <el-date-picker
    v-else-if="field.type === 'datetime'"
    v-model="formData[field.name]"
    type="datetime"
    :placeholder="`请选择${field.label}`"
    format="YYYY-MM-DD hh:mm:ss"
    value-format="YYYY-MM-DD h:m:s"
  />

  <el-select
    v-else-if="field.type === 'select'"
    v-model="formData[field.name]"
    :placeholder="`请选择${field.label}`"
  >
    <el-option
      v-for="option in field.options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    />
  </el-select>

  <el-checkbox-group
    v-else-if="field.type === 'checkbox'"
    v-model="formData[field.name]"
  >
    <el-checkbox
      v-for="option in field.options"
      :key="option.value"
      :label="option.value"
      >{{ option.label }}</el-checkbox
    >
  </el-checkbox-group>

  <el-radio-group
    v-else-if="field.type === 'radio'"
    v-model="formData[field.name]"
  >
    <el-radio
      v-for="option in field.options"
      :key="option.value"
      :value="option.value"
      >{{ option.label }}</el-radio
    >
  </el-radio-group>

  <CustomMap v-else-if="field.type === 'map'" v-model="formData[field.name]" :field="field"/>
  <!-- 扩展... -->
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
import type { FormData, FormField } from "../formTypes";
import CustomMap from "../filedWidgets/customMap.vue";

const emit = defineEmits<{ (e: "update:modelValue", value: any): void }>();
defineProps<{
  field: FormField;
  modelValue: any;
  formData: FormData;
}>();
</script>

<style scoped>
.error-message {
  margin-top: 5px;
}
</style>