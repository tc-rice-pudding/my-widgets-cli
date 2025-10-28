<template>
  <div class="stat-container">
    <div class="initiator-item" v-for="it in initiatorList" :key="it.name">
      <span>{{ it.name }}</span>
      <span>{{ it.count }}</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
const initiatorList = ref<any[]>([
  { name: '张三', count: 120 },
  { name: '李四', count: 98 },
  { name: '王五', count: 76 },
  { name: '赵六', count: 54 },
  { name: '钱七', count: 32 },
  { name: '钱七1', count: 32 },
  { name: '钱七2', count: 32 },
  { name: '钱七3', count: 32 },
  { name: '钱七4', count: 32 },
  { name: '钱七5', count: 32 },
  { name: '钱七6', count: 32 },
  { name: '钱七7', count: 32 },
  { name: '钱七8', count: 32 },
  { name: '钱七9', count: 32 },
  { name: '钱七10', count: 32 },
  { name: '钱七11', count: 32 },
]);
</script>
<style scoped lang='scss'>
.stat-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
  row-gap: 10px;
}

.initiator-item {
  height: 44px;
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #D9D9D9;
  padding: 0 16px 0 44px;
  display: grid;
  grid-template-columns: 60px 1fr;
  align-items: center;
  background-image: url('@/assets/images/dpi/initiator.png');
  background-size: 28px 28px;
  background-repeat: no-repeat;
  background-position: 10px 8px;

  >span:first-of-type {
    font-weight: 400;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.8);
  }

  >span:last-of-type {
    font-family: AgencyFB, AgencyFB;
    font-weight: bold;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.8);
    text-align: right;

    &::after {
      content: '次';
      font-size: 12px;
      color: rgba(0, 0, 0, 0.6);
      padding-left: 4px;
    }
  }
}
</style>