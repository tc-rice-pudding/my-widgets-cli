<template>
  <ul :style="{ 'max-height': heightRef }">
    <li v-for="(item, inx) in list" :key="item.code">
      <span v-ellipsis>{{ item.label }}: {{ item.value }}</span>

      <el-button v-if="inx == 1 && heightRef == '48px'" text link type="primary"
        @click="heightRef = 23 * list.length + 'px'"><el-icon>
          <ArrowDown />
        </el-icon>展开</el-button>
      <el-button v-if="inx == list.length - 1 && heightRef == 23 * list.length + 'px'" text link type="primary"
        @click="heightRef = '48px'"><el-icon>
          <ArrowUp />
        </el-icon>收起</el-button>
    </li>
  </ul>
</template>

<script setup lang='ts'>
const props = defineProps({
  conf: {
    type: String,
    required: true,
  },
});

const heightRef = ref("48px");

const list = computed(() => {
  const tmp = new Function(`return ${props.conf}`)();
  if (Array.isArray(tmp)) {
    return tmp;
  } else {
    return [];
  }
});
</script>

<style scoped lang='scss'>
ul {
  transition: all 0.3s;
  width: 100%;
  overflow: hidden;
}

li {
  display: flex;
  align-items: center;
}
</style>