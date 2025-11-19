<template>
  <div class="app-mgr-view">
    <GlobalContentTitle>
      <template #contentAction>
        <div class="tabsBtn">
          <template v-if="state.tableSelectList.length">
            <el-button type="danger" @click="onDel(null)">
              <el-icon style="margin-right: 4px">
                <Delete />
              </el-icon>
              批量删除
            </el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="onAdd">
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
      class="file-serve-table"
      v-model:pagination="state.pagination"
      :columns="columns"
      :border="false"
      :table-data="state.tableData"
      :loading="state.loading"
      @size-change="sizeChange"
      @page-change="pageChange"
      @selectChange="selectChange"
      @sortChange="sortChange"
    >
      <!-- <template #typeLabel="{ row, column }">
        <TableFilter
          v-model:filterList="state.types"
          :filterData="state.typeFilterData"
          :title="column.label"
          @onSubmit="
            (list) => {
              reflushTable();
            }
          "
        />
      </template> -->
      <template #status="{ row }">
        <switch-widget :row="row" field="status" @changeCB="reflushTable"/>
      </template>
      <template #default="{ row }">
        <div class="btnBox">
          <el-button text link type="primary" @click="onEdit(row)"
            >编辑</el-button
          >
          <el-button text link type="danger" @click="onDel(row)"
            >删除</el-button
          >
        </div>
      </template>
    </GlobalTable>
  </div>

  <del-dialog ref="delDialogRef" @successCB="reflushTable" />
  <detail-drawer ref="detailDrawerRef" @successCB="reflushTable" />
</template>

<script setup lang='ts'>
import { GlobalTableForm } from "@/global-components";
import { columns, searchForm } from "./config";
// import { geSysConfigList } from "@/core/api/applicationMgr";
import SwitchWidget from "./widgets/switchWidget.vue";

const DelDialog = defineAsyncComponent(
  () => import("./components/delDialog.vue")
);
const DetailDrawer = defineAsyncComponent(
  () => import("./components/detailDrawer.vue")
);

const formConditionRef = ref<InstanceType<typeof GlobalTableForm>>();
const delDialogRef = ref<InstanceType<typeof DelDialog>>();
const detailDrawerRef = ref<InstanceType<typeof DetailDrawer>>();
const state = reactive({
  loading: false,
  params: {},
  tableSelectList: [] as any,
  pagination: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
  },
  tableData: [],
  types: [],
  typeFilterData: [],
  orders: [{ asc: false, column: "updateTime" }],
});

// const getAlermGroup = async () => {
//   const { code, data }: any = await groupAlarm({
//     ...state.params,
//     groupColumn: "type",
//     pageNum: 1,
//     pageSize: 99999,
//   });
//   state.typeFilterData = data?.records ?? [];
// };

// ----table data start----
const getTableList = async () => {
  state.loading = true;
  // const { data }: any = await geSysConfigList({
  //   ...state.params,
  //   orders: state.orders,
  //   // types: state.types || [],
  //   pageNum: state.pagination.pageNum,
  //   pageSize: state.pagination.pageSize,
  // });
  // getAlermGroup();
  // state.tableData = data?.records ?? [];
  // state.pagination.total = data?.total ?? 0;
  state.loading = false;
};
const sortChange = ({ order, prop }) => {
  state.orders = [{ asc: order == "ascending", column: prop }];
  getTableList();
};
const tableFilter = (_params) => {
  console.log(_params);
  state.params = { ..._params };
  state.pagination.pageNum = 1;
  getTableList();
};
const sizeChange = (size) => {
  state.pagination.pageNum = 1;
  state.pagination.pageSize = size;
  getTableList();
};
const pageChange = (page) => {
  state.pagination.pageNum = page;
  getTableList();
};
// ----table data end----

// ----table operation start----
const selectChange = (val) => {
  console.log(val);
  state.tableSelectList = val;
};
const onAdd = () => {
  detailDrawerRef.value?.open({});
};
const onEdit = (row) => {
  detailDrawerRef.value?.open(row);
};
const onDel = async (row) => {
  delDialogRef.value?.open(row ? [row] : state.tableSelectList);
};
// ----table operation end----

const reflushTable = () => {
  formConditionRef.value?.searchByForm();
};

onMounted(() => {
  reflushTable();
});
</script>

<style scoped lang='scss'>
.app-mgr-view {
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  :deep .search-container {
    .el-form-item {
      > label {
        width: 50px !important;
        min-width: auto !important;
      }
    }
  }

  .file-serve-table {
    height: calc(100% - 48px - 64px - 20px);
    margin-top: 20px;
  }
}
.copy-container {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  justify-content: space-between;
  .iconfont {
    margin-left: 8px;
    cursor: pointer;
    color: #216dd9;
  }
}
</style>