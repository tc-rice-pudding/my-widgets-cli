<template>
  <div class="custom-map-container">
    <template v-if="mapData.length === 0">
      <el-button
        type="primary"
        link
        :icon="Plus"
        circle
        @click="addItem('0')"
      />
    </template>
    <div
      v-else
      class="map-item"
      v-for="(item, inx) in mapData"
      :key="inx"
      style="margin-bottom: 10px"
    >
      <el-input v-model="item.key" clearable placeholder="请输入" />
      <el-input v-model="item.value" clearable placeholder="请输入" />
      <span>
        <el-button
          type="primary"
          link
          :icon="Plus"
          circle
          @click="addItem(inx)"
        />
        <el-button
          type="danger"
          link
          :icon="Delete"
          circle
          @click="delItem(inx)"
        />
      </span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { Plus, Delete } from "@element-plus/icons-vue";
import { FormField } from "../formTypes";
import { ElMessage } from "element-plus";
const emit = defineEmits<{
  (e: "update:modelValue", value: Record<string, any>): void;
}>();
const props = defineProps<{
  modelValue: Record<string, any>;
  field: FormField;
}>();

const mapData = ref<Record<string, any>>(props.modelValue);

watch(
  mapData,
  (newVal) => {
    emit("update:modelValue", newVal);
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (newVal) => {
    mapData.value = newVal ?? [];
  },
  { immediate: true, deep: true }
);

const addItem = (index: string) => {
  mapData.value.splice(index + 1, 0, { key: "", value: "" });
};

const delItem = (index: string) => {
  mapData.value.splice(index, 1);
};
</script>

<style scoped lang='scss'>
.custom-map-container {
  width: 100%;
  .map-item {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    column-gap: 8px;
    row-gap: 16px;
    button {
      margin: 0 !important;
    }
  }
}
</style>