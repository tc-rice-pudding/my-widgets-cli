<template>
  <div class="global-empty">
    <span class="global-empty-text">{{ props.description }}</span>
  </div>
</template>

<script setup lang='ts'>
const props = defineProps({
  description: {
    type: String,
    default: "暂无数据",
  },
  height: {
    type: Number,
    default: 150
  }
});
</script>

<style scoped lang='scss'>
.global-empty {
  width: 100%;
  height: 100%;
    min-height: v-bind('props.height+"px"');
  background-image: url("@/assets/svg/empty.svg");
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  background-size: 150px;
}
.global-empty-text {
  color: rgba(0, 0, 0, 0.45);
  position: absolute;
  left: 50%;
  font-size: 14px;
  transform: translateX(-50%);
  top: calc(50% + 50px);
}
</style>