<template>
  <div class="process-container">
    <GlobalProgress v-for="it in progressList" :key="it.order" v-bind="it" />
  </div>
</template>

<script setup lang='ts'>
const progressList = ref<any[]>([
  {
    bgColor: "#FEEDEC",
    pgStartColor: "#E33837",
    pgEndColor: "#FB8784",
    label: "比例",
    percentage: 0,
    order: 1,
    orderBgColor: 'linear-gradient(180deg, #FEEBB1 0%, #F9C45B 100%)',
    orderColor: '#C28300',
  },
  {
    bgColor: "#FBECE2",
    pgStartColor: "#E27D38",
    pgEndColor: "#FAAB84",
    label: "比例",
    percentage: 0,
    order: 2,
    orderBgColor: 'linear-gradient( 180deg, #EBEDFD 0%, #B7BCCD 100%)',
    orderColor: '#7D808F',
  },
  {
    bgColor: "#FBF3E3",
    pgStartColor: "#E4AD3F",
    pgEndColor: "#FEE8A5",
    label: "比例",
    percentage: 0,
    order: 3,
    orderBgColor: 'linear-gradient( 180deg, #FEDCC4 0%, #FDC5A9 100%)',
    orderColor: '#C28300',
  },
  {
    bgColor: "#dae6f7",
    pgStartColor: "#216DD9",
    pgEndColor: "#68A7FF",
    label: "比例",
    percentage: 0,
    order: 4,
    orderBgColor: 'linear-gradient( 142deg, #F0F0F0 0%, #D5D7D4 100%)',
    orderColor: '#818181',
  },
  {
    bgColor: "#dae6f7",
    pgStartColor: "#216DD9",
    pgEndColor: "#68A7FF",
    label: "比例",
    percentage: 0,
    order: 5,
    orderBgColor: 'linear-gradient( 142deg, #F0F0F0 0%, #D5D7D4 100%)',
    orderColor: '#818181',
  },
  {
    bgColor: "#dae6f7",
    pgStartColor: "#216DD9",
    pgEndColor: "#68A7FF",
    label: "比例",
    percentage: 0,
    order: 6,
    orderBgColor: 'linear-gradient( 142deg, #F0F0F0 0%, #D5D7D4 100%)',
    orderColor: '#818181',
  },
  {
    bgColor: "#dae6f7",
    pgStartColor: "#216DD9",
    pgEndColor: "#68A7FF",
    label: "比例",
    percentage: 0,
    order: 7,
    orderBgColor: 'linear-gradient( 142deg, #F0F0F0 0%, #D5D7D4 100%)',
    orderColor: '#818181',
  },
  {
    bgColor: "#dae6f7",
    pgStartColor: "#216DD9",
    pgEndColor: "#68A7FF",
    label: "比例",
    percentage: 0,
    order: 8,
    orderBgColor: 'linear-gradient( 142deg, #F0F0F0 0%, #D5D7D4 100%)',
    orderColor: '#818181',
  },
  {
    bgColor: "#dae6f7",
    pgStartColor: "#216DD9",
    pgEndColor: "#68A7FF",
    label: "比例",
    percentage: 0,
    order: 9,
    orderBgColor: 'linear-gradient( 142deg, #F0F0F0 0%, #D5D7D4 100%)',
    orderColor: '#818181',
  },
  {
    bgColor: "#dae6f7",
    pgStartColor: "#216DD9",
    pgEndColor: "#68A7FF",
    label: "比例",
    percentage: 0,
    order: 10,
    orderBgColor: 'linear-gradient( 142deg, #F0F0F0 0%, #D5D7D4 100%)',
    orderColor: '#818181',
  },
]);
</script>

<style scoped lang='scss'></style>