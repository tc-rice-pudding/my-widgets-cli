<template>
  <div class="drag-bar">
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="icon icon-drag-bar" icon="drag-bar">
      <g transform="translate(5 1)" stroke="currentColor">
        <circle cx="1" cy="1" r="1"></circle>
        <circle cx="5" cy="1" r="1"></circle>
        <circle cx="1" cy="5" r="1"></circle>
        <circle cx="5" cy="5" r="1"></circle>
        <circle cx="1" cy="9" r="1"></circle>
        <circle cx="5" cy="9" r="1"></circle>
        <circle cx="1" cy="13" r="1"></circle>
        <circle cx="5" cy="13" r="1"></circle>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.drag-bar {
  width: 15px;
  height: 15px;
  position: absolute;
  left: 10px;
  top: 15px;
  color: #84878c;
  cursor: pointer;
}
</style>