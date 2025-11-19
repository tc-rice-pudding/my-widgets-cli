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
              新增调度器
            </el-button>
          </template>
        </div>
      </template>
    </GlobalContentTitle>
    <GlobalTableForm ref="formConditionRef" :formFieldsOptions="searchForm" @tableReset="(_params)=>{
      state.scheduleTypes=[];
      tableFilter(_params);
    }"
      @tableFilter="tableFilter" />

    <GlobalTable class="file-serve-table" v-model:pagination="state.pagination" :columns="columns" :border="false"
      :table-data="state.tableData" :loading="state.loading" @sortChange="sortChange" @size-change="sizeChange"
      @page-change="pageChange" @selectChange="selectChange">
      <template #scheduleTypeLabel="{ row, column }">
        <TableFilter v-model:filterList="state.scheduleTypes" :labelMap="scheduleTypeMap" :filterData="state.filterData"
          :title="column.label" @onSubmit="(list)=>{
            reflushTable();
          }" />
      </template>
      <template #scheduleType="{ row }">
        {{ scheduleTypeMap?.[row.scheduleType] ?? row.scheduleType }}
      </template>
      <template #jobNum="{ row }">
        <el-button text link type="primary" @click="goTaskPage(row)">{{ row.jobNum }}</el-button>
      </template>
      <template #expression="{ row }">
        <div class="time-container">
          <el-tooltip class="box-item" effect="dark" placement="bottom-start" :disabled="scheduleTypeMap[row.scheduleType] == '无'">
            <template #content>
              <ul class="time-list-container">
                <li>最新执行时间：</li>
                <li v-for="(it,inx) in row.timeList??[]" :key="inx">{{ inx+1 }}. {{it}}</li>
              </ul>
            </template>
            <el-icon v-if="!['无'].includes(scheduleTypeMap[row?.scheduleType])" class="iconfont icon-zhihangshijian" size="16px" @mouseenter="getExecuteTimeHandler(row)"/>
          </el-tooltip>
          <span>{{ row.expression }}</span>
        </div>
      </template>
      <template #default="{ row }">
        <div class="btnBox">
          <el-button text link type="primary" @click="onEdit(row)">编辑</el-button>
          <el-button text link type="danger" @click="onDel(row)">删除</el-button>
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
// import { getExecuteTime, getScheduleGroup, getScheduleList } from "@/core/api/schedulerMgr";
import { useDict } from "./hooks/useDict";
import TableFilter from "./components/TableFilter.vue";
import { dayjs } from "element-plus";
const DelDialog = defineAsyncComponent(
  () => import("./components/delDialog.vue")
);
const DetailDrawer = defineAsyncComponent(
  () => import("./components/detailDrawer.vue")
);

const { scheduleTypeMap, cronTypeMap, periodMap, initDict } = useDict();
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
  order: false,
  tableData: [],
  filterData: [],
  scheduleTypes: [],
});

// ----table data start----
const getScheduleGroupHandler = async (params, filterField) => {
  const _params = { ...params };
  delete _params.orders
  delete _params[`${filterField}s`]
  // const { data }: any = await getScheduleGroup({ ..._params, groupColumn: 'scheduleType', pageSize: 99999 });
  // state.filterData = (data?.records ?? []);
};
const getTableList = async () => {
  state.loading = true;

  const params = {
    ...state.params,
    scheduleTypes: state.scheduleTypes,
    pageNum: state.pagination.pageNum,
    pageSize: state.pagination.pageSize,
    orders: [{ column: "createTime", asc: state.order }],
  };
  getScheduleGroupHandler(params, 'scheduleType');
  // const { data }: any = await getScheduleList(params);
  // state.tableData = data?.records ?? [];
  // state.pagination.total = data?.total ?? 0;
  state.loading = false;
};
const tableFilter = (_params) => {
  console.log(_params);
  state.params = { ..._params };
  state.pagination.pageNum = 1;
  getTableList();
};
const sortChange = (data) => {
  state.order = data.order == "ascending";
  console.log(data);
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
const goTaskPage = (row) => {
  window.open(`/web/dispatch/taskMgr?schedulerId=${row.id}`);
};

const getExecuteTimeHandler = async (row) => {
  if(scheduleTypeMap.value[row.scheduleType] == '单次'){
    row.timeList= [row.expression];
    return;
  }
  if(scheduleTypeMap.value[row.scheduleType] == '固定速度'){
    row.timeList = new Array(5)
      .fill("")
      .map((it,inx) =>
        dayjs()
          .add(row.expression*(inx+1), "second")
          .format("YYYY-MM-DD HH:mm:ss")
      );
    return;
  }
  // const { data, code }: any = await getExecuteTime(row.expression);
  // if (code == 200) {
  //   row.timeList = data ?? [];
  // }
};
// ----table operation end----

const reflushTable = () => {
  formConditionRef.value?.searchByForm();
};

onMounted(async () => {
  reflushTable();

  await initDict();
  // searchForm[1].options = Object.entries(scheduleTypeMap.value).map(
  //   ([value, label]) => ({ label, value })
  // );
});
</script>

<style scoped lang='scss'>
.app-mgr-view {
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  :deep .search-container {
    .el-form-item {
      >label {
        width: 100px !important;
        min-width: auto !important;
      }
    }
  }

  .file-serve-table {
    height: calc(100% - 48px - 64px - 20px);
    margin-top: 20px;
  }
}

.time-container {
  display: flex;
  align-items: center;
  column-gap: 8px;
  .icon-zhihangshijian {
    color: #226ED9;
    cursor: pointer;
  }
}

.time-list-container{
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  padding: 8px 20px 8px 0;
  >li{
    font-weight: 400;
    font-size: 12px;
    color: rgba(255,255,255,0.8);
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