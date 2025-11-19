<template>
  <second v-bind="$attrs" unit="月" :selectOps="new Array(12).fill(0).map((it,inx)=>inx+1)"/>
</template>
<script setup lang='ts'>
import second from "./second.vue";
</script>

<style scoped lang='scss'>
</style>