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

    <GlobalTableForm ref="formConditionRef" :formFieldsOptions="searchForm" @tableReset="tableFilter"
      @tableFilter="tableFilter" />

    <GlobalTable v-model:pagination="state.pagination" :columns="columns" :border="false" :table-data="state.tableData"
      :loading="state.loading" @sortChange="tableOperMap.sortChange" @size-change="sizeChange" @page-change="pageChange"
      @selectChange="tableOperMap.selectChange">
      <template #opera="{ row }">
        <div class="btnBox">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-button text link type="primary">新增 </el-button>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-if="row.level < 3" @click="tableOperMap.onAdd(row, 1)">新增子级</el-dropdown-item>
                <el-dropdown-item @click="tableOperMap.onAdd(row, 2)">新增同级</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button text link type="primary" @click="tableOperMap.onEdit(row)">编辑</el-button>
          <el-button text link type="danger" @click="tableOperMap.onDel(row)">删除</el-button>
        </div>
      </template>
    </GlobalTable>

    <c.delDialog :ref="compRefs.delDialogRef" @successCB="onTableSearch" />
    <c.detailDrawer :ref="compRefs.detailDrawerRef" @successCB="onTableSearch" />
  </div>
</template>

<script setup lang="ts">
import { useInitTable } from "@/core/hooks/useInitTable";
import { searchForm, columns } from "./config";
import c, { compRefs } from "./components";
// import { glueDicList } from "@/core/api/taskMgr";

const state = reactive({
  loading: false,
  params: {} as any,
  tableData: [
    {
      "id": 1,
      "parentId": 0,
      "name": "test",
      "sort": -10,
      "group": "字典",
      "code": "1",
      "remark": "",
      "level": 1,
      "updateTime": "2025-10-14 11:25:17"
    },
    {
      "id": 2,
      "parentId": 0,
      "name": " executing_state",
      "sort": -6,
      "group": "执行状态",
      "code": "1",
      "remark": "执行状态父级",
      "level": 1,
      "updateTime": "2025-10-14 11:22:57",
      "children": [
        {
          "id": 3,
          "parentId": 2,
          "name": "执行中",
          "sort": 0,
          "group": "执行状态",
          "code": "01",
          "remark": "in_execution",
          "level": 2,
          "updateTime": "2025-10-14 11:18:21"
        },
        {
          "id": 4,
          "parentId": 2,
          "name": "失败",
          "sort": 1,
          "group": "执行状态",
          "code": "02",
          "remark": "defeated",
          "level": 2,
          "updateTime": "2025-10-14 11:19:52",
          "children": [
            {
              "id": 7,
              "parentId": 4,
              "name": "4",
              "sort": 0,
              "group": "执行状态",
              "code": "05",
              "remark": "test2作为父级",
              "level": 3,
              "updateTime": "2025-10-14 11:35:59"
            },
            {
              "id": 8,
              "parentId": 4,
              "name": "同三级",
              "sort": 0,
              "group": "执行状态",
              "code": "1342",
              "remark": "执行状态1342",
              "level": 3,
              "updateTime": "2025-10-17 13:42:47"
            }
          ]
        },
        {
          "id": 5,
          "parentId": 2,
          "name": "成功",
          "sort": -4,
          "group": "执行状态",
          "code": "03",
          "remark": "",
          "level": 2,
          "updateTime": "2025-10-14 11:23:06"
        }
      ]
    }
  ] as any[],
  tableSelectList: [] as any[],
  pagination: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
  },
  orders: [{ asc: false, column: "updateTime" }],
});

const getTableList = async () => {
  // state.loading = true;
  // const params = {
  //   ...state.params,
  //   pageNum: state.pagination.pageNum,
  //   pageSize: state.pagination.pageSize,
  //   orders: state.orders || [],
  // };

  // const { data, code }: any = await glueDicList(params);
  // if (code != 200) return;
  // state.loading = false;
  // state.tableData = data?.records ?? [];
  // state.pagination.total = data?.total ?? 0;
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
  onAdd: (row, isChild = 1) => {
    const tmp = { id: null, group: '', name: '', parentId: '', code: '', sort: '', remark: '' };
    if (isChild == 1) { // 新增子级
      compRefs.detailDrawerRef.value?.open({ ...tmp, parentId: row.id, group: row.group }, 'add-level');
    } else if (isChild == 2) { // 新增同级
      compRefs.detailDrawerRef.value?.open({ ...tmp, parentId: row.parentId, group: row.group }, 'add-level');
    } else {
      compRefs.detailDrawerRef.value?.open(null, 'add');
    }
  },
  onEdit: (row) => {
    compRefs.detailDrawerRef.value?.open(row);
  },
  onDel: (row) => {
    compRefs.delDialogRef.value?.open([row]);
  },
};

onMounted(onTableSearch);
</script>

<style scoped lang="scss">
.table-demo-container {
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  :deep .table-container {
    height: calc(100% - 48px - 64px - 20px);
    margin-top: 20px;
  }

  :deep .search-container {
    label {
      width: auto !important;
      min-width: unset !important;
    }
  }

  .hidden {
    position: relative;
    right: -999px;
  }
}
</style>
