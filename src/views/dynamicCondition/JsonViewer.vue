<template>
  <div id="json-viewer"></div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import "@andypf/json-viewer"

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

let jsonViewer: any = {}

watch(props.data, (newData, oldData) => {
  jsonViewer.data = newData
})

onMounted(() => {
  jsonViewer = document.createElement("andypf-json-viewer")
  jsonViewer.id = "json"
  jsonViewer.expanded = 2
  jsonViewer.indent = 2
  jsonViewer.showDataTypes = true
  jsonViewer.theme = "monokai"
  jsonViewer.showToolbar = true
  jsonViewer.showSize = true
  jsonViewer.showCopy = true
  jsonViewer.expandIconType = "square"
  jsonViewer.data = props.data

  document.querySelector('#json-viewer')?.appendChild(jsonViewer)
})
</script>

<style scoped>

</style>