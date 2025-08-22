<template>
  <div class="process-container">
    <div class="process-title">
      <span>{{ props.label }}</span>
      <span>{{ props.percentage }}%</span>
    </div>
    <div class="process-content">
      <div
        class="process-number"
        :class="{ 'process-suffix': props.percentage < 100 }"
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
interface Props {
  bgColor?: string; // 背景色
  pgStartColor?: string; // 进度渐变色 start
  pgEndColor?: string; // 进度渐变色 end
  label: string; // label 名称
  percentage: number; // 进度值
}
const props = withDefaults(defineProps<Props>(), {
  bgColor: "rgb(250 171 132 / 50%)",
  pgStartColor: "#faab84",
  pgEndColor: "#e27d38",
  label: "比例",
  percentage: 10,
});
</script>

<style scoped lang='scss'>
.process-container {
  padding: 5px 20px;

  .process-title {
    display: flex;
    justify-content: space-between;
    line-height: 24px;

    > span:nth-of-type(1) {
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      font-size: 14px;
    }
    > span:nth-of-type(2) {
      font-weight: bold;
      font-size: 16px;
      color: #000000;
    }
  }

  .process-suffix {
    clip-path: polygon(0 0, calc(100% - 5px) 0, 100% 100%, 0 100%);
    &:after {
      content: "";
      display: inline-block;
      background: v-bind("props.pgEndColor");
      width: 2px;
      height: 20px;
      position: absolute;
      right: 3px;
      top: -1px;
      transform: rotateZ(343deg);
    }
  }

  .process-content {
    height: 16px;
    background: v-bind("props.bgColor");
    overflow: hidden;

    .process-number {
      width: v-bind("props.percentage+'%'");
      height: 100%;
      background: linear-gradient(
        90deg,
        v-bind("props.pgEndColor") 0%,
        v-bind("props.pgStartColor") 100%
      );
      position: relative;
      transition: all 0.3s;
    }
  }
}
</style>