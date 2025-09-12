<template>
  <div class="table-demo-container">
    <GlobalContentTitle>
      <template #contentAction>
        <div class="tabsBtn">
          <template v-if="state.tableSelectList.length">
            <el-button type="danger" @click="tableOperMap.onDel(null)">
              <el-icon style="margin-right: 4px">
                <Delete />
              </el-icon>
              批量删除
            </el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="tableOperMap.onAdd">
              <el-icon style="margin-right: 4px">
                <Plus />
              </el-icon>
              新增
            </el-button>
          </template>
        </div>
      </template>
    </GlobalContentTitle>

    <GlobalTableForm
      ref="formConditionRef"
      :formFieldsOptions="searchForm"
      @tableReset="tableFilter"
      @tableFilter="tableFilter"
    />

    <GlobalTable
      v-model:pagination="state.pagination"
      :columns="columns"
      :border="false"
      :table-data="state.tableData"
      :loading="state.loading"
      @sortChange="tableOperMap.sortChange"
      @size-change="sizeChange"
      @page-change="pageChange"
      @selectChange="tableOperMap.selectChange"
    >
      <template #stat="{ row }">
        <!-- 状态组件 -->
        <w.statusWidget :code="row.stat" :label="statusEnum[row.stat]" />
      </template>

      <template #flowStatus="{ row }">
        <!-- 状态组件 -->
        <w.switchWidget
          :row="row"
          field="flowStatus"
          @changeCB="onTableSearch"
        />
      </template>

      <template #typeLabel="{ row, column }">
        <!-- 表头过滤 -->
        <w.filterWidget
          v-model:filterList="state.types"
          :filterData="state.typeFilterData"
          :title="column.label"
          @onFilter="onTableSearch"
        />
      </template>
      <template #statLabel="{ row, column }">
        <!-- 表头过滤 -->
        <w.filterWidget
          v-model:filterList="state.stats"
          :filterData="state.statFilterData"
          :title="column.label"
          @onFilter="onTableSearch"
        />
      </template>

      <template #default="{ row }">
        <div class="btnBox">
          <el-button text link type="primary" @click="tableOperMap.onEdit(row)"
            >编辑</el-button
          >
          <el-button text link type="danger" @click="tableOperMap.onDel(row)"
            >删除</el-button
          >
        </div>
      </template>
    </GlobalTable>

    <c.delDialog :ref="compRefs.delDialogRef" />
    <c.detailDrawer :ref="compRefs.detailDrawerRef" />
  </div>
</template>

<script setup lang='ts'>
import { useInitTable } from "@/core/hooks/useInitTable";
import { searchForm, columns, statusEnum } from "./config";
import w from "./widgets";
import c, { compRefs } from "./components";

const state = reactive({
  loading: false,
  params: {} as any,
  tableData: [] as any[],
  tableSelectList: [] as any[],
  pagination: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
  },
  orders: [{ asc: false, column: "createTime" }],

  types: [],
  typeFilterData: [],
  stats: [],
  statFilterData: [],
});

const getGroupHandler = async (_params, filterField) => {
  const params = { ..._params, pageNum: 1, pageSize: 99999 };
  delete params.orders;
  delete params[`${filterField}s`];
  console.log("groupParams=>", params);
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
  state[`${filterField}FilterData`] = [
    { name: "name1", count: "20", value: "value1" },
    { name: "name2", count: "30", value: "value2" },
  ];
};

const getTableList = async () => {
  state.loading = true;
  const params = {
    ...state.params,
    pageNum: state.pagination.pageNum,
    pageSize: state.pagination.pageSize,
    orders: state.orders || [],
    types: state.types || [],
    stats: state.stats || [],
  };
  console.log("tableParams=>", params);
  getGroupHandler(params, "type");
  getGroupHandler(params, "stat");

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });

  state.loading = false;
  state.tableData = [
    { stat: 1, flowStatus: 1 },
    { stat: 0, flowStatus: 0 },
    { stat: 0, flowStatus: 1 },
    { stat: 1, flowStatus: 1 },
  ];
  state.pagination.total = 4;
};
const [onTableSearch, sizeChange, pageChange] = useInitTable(
  getTableList,
  state.pagination
);

const tableFilter = (_params) => {
  state.params = {
    ..._params,
    ...(_params.timeRange?.length
      ? {
          startTime: _params.timeRange[0],
          endTime: _params.timeRange[1],
        }
      : {}),
  };
  delete state.params.timeRange;
  state.pagination.pageNum = 1;
  onTableSearch();
};

const tableOperMap = {
  sortChange: ({ order, prop }) => {
    state.orders = [{ asc: order == "ascending", column: prop }];
    onTableSearch();
  },
  selectChange: (val) => {
    state.tableSelectList = val;
  },
  onEdit: (row) => {
    console.log("onEdit");
    compRefs.detailDrawerRef.value?.open(row);
  },
  onDel: (row?) => {
    compRefs.delDialogRef.value?.open(row);
  },
  onAdd: () => {
    console.log("onAdd");
  },
};

onMounted(onTableSearch);
</script>

<style scoped lang='scss'>
.table-demo-container {
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  :deep .table-container {
    height: calc(100% - 48px - 64px - 20px);
    margin-top: 20px;
  }
}
</style>