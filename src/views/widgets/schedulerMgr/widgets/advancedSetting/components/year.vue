<template>
  <second v-bind="$attrs" unit="年" :selectOps="new Array(10).fill(+new Date().getFullYear()).map((it,inx)=>it+inx)"/>
</template>
<script setup lang='ts'>
import second from "./second.vue";
</script>

<style scoped lang='scss'>
</style>