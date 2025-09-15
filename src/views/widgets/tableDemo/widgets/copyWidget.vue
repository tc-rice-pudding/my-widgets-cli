<template>
  <div class="copy-container">
    <span v-ellipsis="contentRef">{{ contentRef }}</span>
    <el-icon v-copy="contentRef" v-if="contentRef?.length">
      <CopyDocument />
    </el-icon>
  </div>
</template>

<script setup lang='ts'>
const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
  field: {
    type: String,
    required: true,
  }
});

const contentRef = computed(() => props.row[props.field] ?? '');
</script>

<style scoped lang='scss'>
.copy-container {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;

  >i {
    cursor: pointer;
    color: #216DD9;
  }
}
</style>