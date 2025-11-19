<template>
  <second v-bind="$attrs" unit="小时" :selectOps="new Array(24).fill(0).map((it,inx)=>inx)"/>
</template>
<script setup lang='ts'>
import second from "./second.vue";
</script>

<style scoped lang='scss'>
</style>