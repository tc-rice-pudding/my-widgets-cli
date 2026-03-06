<template>
  <el-select v-model="state.searchForm.clientList" placeholder="全部" filterable clearable multiple collapse-tags
    collapse-tags-tooltip popper-class="develop-container">
    <template #header>
      <ul class="menu-list">
        <li :class="['menu-item', state.searchForm.clientType == 'appIdList' && 'active']"
          @click="state.searchForm.clientType = 'appIdList'">应用
          <el-icon>
            <ArrowRight />
          </el-icon>
        </li>
        <li :class="['menu-item', state.searchForm.clientType == 'clientServiceIdList' && 'active']"
          @click="state.searchForm.clientType = 'clientServiceIdList'">服务
          <el-icon>
            <ArrowRight />
          </el-icon>
        </li>
      </ul>
    </template>
    <template v-if="state.searchForm.clientType == 'appIdList'">
      <el-option v-for="item in clientIdOps1" :key="item.value" :label="item.label" :value="item.value" />
    </template>
    <template v-if="state.searchForm.clientType == 'clientServiceIdList'">
      <el-option v-for="item in clientIdOps2" :key="item.value" :label="item.label" :value="item.value" />
    </template>
  </el-select>
</template>

<script setup lang='ts'>
const clientIdOps1 = [
  { label: '张三', value: '1' },
  { label: '李四', value: '2' },
];
const clientIdOps2 = [
  { label: '王五', value: '3' },
  { label: '赵六', value: '4' },
  { label: '刘七', value: '5' },
];
const state = reactive({
  searchForm: {
    clientType: 'appIdList',
    clientList: [],
  },
});
</script>

<style scoped lang='scss'></style>
<style lang="scss">
.develop-container {
  width: 386px;
  min-width: unset !important;
  overflow: hidden;
  display: grid;
  grid-template-columns: auto 1fr;

  .el-select-dropdown__header {
    border-right: 1px solid #D9D9D9;
  }

  .menu-list {
    .menu-item {
      width: 76px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;
    }

    .menu-item:hover,
    .menu-item.active {
      background: #F2F2F2;
      color: #216DD9;
    }
  }

  .el-select-dropdown__empty {
    display: none;
    padding: 0;
  }
}
</style>