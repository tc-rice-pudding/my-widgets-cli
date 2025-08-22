<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="[cacheList]">
      <component :is="Component" :key="key" />
    </keep-alive>
  </router-view>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useTags } from "@/pinia/modules/tags";
import { storeToRefs } from "pinia";
const route = useRoute();
const { cacheList } = storeToRefs(useTags());

const key = computed(() => route.fullPath);
</script>
