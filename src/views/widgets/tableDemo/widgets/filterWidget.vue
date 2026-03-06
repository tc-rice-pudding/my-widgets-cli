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
        :table-data="state.tableData" @selectChange="handleSelectionChange" :loading="false" style="height: 200px">
        <template #nameSlot="{ column }">
          <div style="display: flex; align-items: center; gap: 4px;">
            <span>{{ props.title }}</span>
            <el-popover title="" placement="bottom-start" :width="240" :visible="column.searchVisible">
              <template #reference>
                <el-button :class="[`registerBtn-${props.field}`]" type="primary" size="small" link text
                  @click="column.searchVisible = !column.searchVisible">
                  <el-icon>
                    <Search />
                  </el-icon>
                </el-button>
              </template>
              <section v-click-outside:[`registerBtn-${props.field}`]="() => {
                column.searchVisible = false;
              }">
                <el-input v-model="state.keyword" />
                <div class="btn-container">
                  <el-button size="small" type="primary" plain @click="onSearch(column)">查询</el-button>
                  <el-button size="small" @click="onReset(column)">重置</el-button>
                  <el-button size="small" @click="column.searchVisible = false">关闭</el-button>
                </div>
              </section>
            </el-popover>
          </div>
        </template>
        <template #name="{ row }">
          <div v-ellipsis v-html="getLabel(props.labelMap?.[row.value] ?? row.name ?? row.item)"></div>
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
  field: {
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
    labelSlot: 'nameSlot',
    tdSlot: "name",
    showTooltip: true,
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
  tableData: [] as any[],
  keyword: '',
});

watch(() => props.filterData, () => {
  state.tableData = props.filterData ?? [];
}, {
  immediate: true,
  deep: true
});

const onSearch = (column) => {
  state.tableData = props.filterData.filter(it => `${it.name}`.includes(state.keyword))
  column.searchVisible = false;
};
const onReset = (column) => {
  state.keyword = '';
  state.tableData = props.filterData;
  column.searchVisible = false;
};
const getLabel = (nameValue) => {
  if (state.keyword) {
    return `${nameValue ?? ''}`.replace(state.keyword, (str) => {
      return `<span style="background: rgb(255, 192, 105);">${str}</span>`;
    })
  }
  return nameValue;
};

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


.btn-container {
  margin-top: 12px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 4px;
  >button:nth-of-type(2){
    width: 48px !important;
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