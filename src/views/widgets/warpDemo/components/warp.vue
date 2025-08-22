<template>
  <div class="warp-view">
    <div class="warp-title">
      <span>{{ props?.title ?? '' }}</span>
      <slot name="btn" />
    </div>
    <section>
      <slot />
    </section>
  </div>
</template>
<script setup lang='ts'>
const props = defineProps({
  title: String,
});
</script>

<style scoped lang='scss'>
.warp-view {
  background: #FFFFFF;
  border-radius: 4px;
  padding: 14px 16px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  .warp-title {
    display: flex;
    justify-content: space-between;

    >span {
      font-weight: 500;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.8);
      padding-bottom: 14px;
    }
  }

  >section {
    height: calc(100% - 38px);
  }
}
</style>