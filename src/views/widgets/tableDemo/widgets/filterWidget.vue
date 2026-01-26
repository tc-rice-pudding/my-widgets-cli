<template>
  <div class="filter-container">
    <span>
      {{ props.title }}
    </span>
    <el-icon :class="['icon-container', props.filterList?.length && 'active']" size="14px" @click="open">
      <Filter />
    </el-icon>
    <el-dialog v-model="state.visable" :title="`${props.title}筛选`" width="400" append-to-body
      class="custom-filter-dialog">
      <GlobalTable ref="tableRef" class="custom-table" :columns="columns" :border="false" rowKey="value"
        :table-data="props.filterData" @selectChange="handleSelectionChange" :loading="false" style="height: 200px">
        <template #name="{ row }">
          <div v-ellipsis>{{ props.labelMap?.[row.value] ?? row.name ?? row.value }}</div>
        </template>
      </GlobalTable>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="onFilter">筛选</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang='ts'>
interface ItemType {
  value: number | string;
  count: number;
}
const emits = defineEmits(["onFilter", "update:filterList"]);
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  labelMap: {
    type: Object,
    default: {},
  },
  filterData: {
    type: Array<any>,
    default: [],
  },
  filterList: {
    type: Array<ItemType["value"]>,
  },
});

const columns = [
  { type: "selection", width: 60 },
  {
    label: "筛选类型",
    "min-width": 140,
    tdSlot: "name",
  },
  {
    label: "数量",
    prop: "count",
    "min-width": 100,
  },
];

const tableRef = ref();
const state = reactive({
  visable: false,
  selected: [] as ItemType[],
});

const open = () => {
  state.visable = true;

  if (props.filterList?.length == 0) {
    resetFilter();
  } else {
    checkFilter();
  }
};
const close = () => {
  state.visable = false;
};

const handleSelectionChange = (checked = []) => {
  state.selected = checked;
};

const onFilter = () => {
  const list = state.selected.map((it) => it.value);
  emits("update:filterList", list);
  emits("onFilter", list);
  close();
};

const checkFilter = () => {
  nextTick(() => {
    props.filterList?.forEach(it => {
      const tmp = props.filterData.find(i => i.value == it);
      tmp && tableRef.value?.tableRef?.toggleRowSelection(tmp, true);
    });
  });
};
const resetFilter = () => {
  nextTick(() => {
    tableRef.value?.tableRef?.clearSelection();
  });
};

defineExpose({ resetFilter });
</script>

<style scoped lang='scss'>
.filter-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  column-gap: 4px;

  .active {
    color: var(--el-color-primary);
  }
}

:deep .custom-table {
  height: 200px;

  .el-table {
    height: 100% !important;
  }

  th>.cell,
  .cell {
    text-align: left;
  }
}

.icon-container {
  transition: all 0.3s;

  &:hover {
    color: var(--el-color-primary);
  }
}
</style>
<style lang="scss">
.custom-filter-dialog {
  .el-dialog__body {
    padding: 0 !important;
  }
}

.custom-table {
  height: 200px;

  .el-table {
    height: 100% !important;

    th>.cell,
    .cell {
      text-align: left !important;
    }
  }
}
</style>