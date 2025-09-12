<template>
  <span :class="['tag-container', `tag_${props.code}`]">
    {{ props.label }}
  </span>
</template>

<script setup lang='ts'>
const props = defineProps({
  code: [String, Number],
  label: String,
});
</script>

<style scoped lang='scss'>
.tag-container {
  border-radius: 2px;
  font-weight: 400;
  font-size: 12px;
  padding: 2px 8px;
}
.tag_1 {
  background: #e8ffea;
  border: 1px solid #94e09a;
  color: #1bb327;
}
.tag_0 {
  background: #ffeae8;
  border: 1px solid #d93021;
  color: #d93021;
}
</style>