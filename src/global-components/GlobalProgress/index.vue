<template>
  <div class="process-container" :style="{ '--order': props.order }">
    <div class="order-container" v-if="props.order">{{ props.order }}</div>
    <div class="process-title">
      <span>{{ props.label }}</span>
      <span>{{ props.percentageSlot ?? `${props.percentage}%` }}</span>
    </div>
    <div class="process-content">
      <div class="process-number" :class="{ 'process-suffix': props.percentage < 100 }" />
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
  percentageSlot?: string; // 进度值插槽
  order: number; // 排序
  orderBgColor?: string; // 排序背景色
  orderColor?: string; // 排序颜色
}
const props = withDefaults(defineProps<Props>(), {
  bgColor: "rgb(250 171 132 / 50%)",
  pgStartColor: "#faab84",
  pgEndColor: "#e27d38",
  label: "比例",
  percentage: 10,
  order: 1,
  orderBgColor: 'linear-gradient(180deg, #FEEBB1 0%, #F9C45B 100%)',
  orderColor: '#C28300',
});
</script>

<style scoped lang='scss'>
.process-container {
  padding: 5px 20px 5px 36px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 12px;
    width: 24px;
    height: 30px;
    background: v-bind("props.orderBgColor");
    text-align: center;
    line-height: 25px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  &::after {
    content: "";
    display: inline-block;
    border-bottom: 7px solid #fff;
    border-top: 0px solid transparent;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    position: absolute;
    top: 36px;
    left: 0;
  }

  .order-container {
    position: absolute;
    position: absolute;
    left: 0;
    top: 12px;
    color: v-bind("props.orderColor");
    width: 24px;
    height: 30px;
    text-align: center;
  }

  .process-title {
    display: flex;
    justify-content: space-between;
    line-height: 24px;

    >span:nth-of-type(1) {
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      font-size: 14px;
    }

    >span:nth-of-type(2) {
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
      transform: rotateZ(332deg);
    }
  }

  .process-content {
    height: 10px;
    background: v-bind("props.bgColor");
    overflow: hidden;

    .process-number {
      width: v-bind("props.percentage + '%'");
      height: 100%;
      background: linear-gradient(90deg,
          v-bind("props.pgEndColor") 0%,
          v-bind("props.pgStartColor") 100%);
      position: relative;
      transition: all 0.3s;
    }
  }
}
</style>