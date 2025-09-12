<template>
  <div class="table-container">
    <el-table
      ref="tableRef"
      v-loading="loading"
      :data="tableData"
      tooltip-effect="dark"
      empty-text=" "
      :row-key="props.rowKey"
      :border="props.border"
      :stripe="props.stripe"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
      @select-all="handleSelectAll"
      @filter-change="handleFilterChange"
    >
      <!-- :height="state.tableData.length * 50 > 500 + 50 ? 550 : (state.tableData.length * 50 + 50)" -->
      <el-table-column
        v-for="item in props.columns"
        :key="item.label"
        :show-overflow-tooltip="item.showTooltip"
        :tooltip-options="{ visible: true }"
        v-bind="item"
        :selectable="checkSelectable"
        :type="
          item.prop == 'index'
            ? 'index'
            : item.type === 'selection'
            ? 'selection'
            : item.prop
        "
        :fixed="item.fixed || false"
        :filters="item.filters"
        :column-key="item.columnKey"
        :reserve-selection="props.reverseSelection && item.type === 'selection'"
      >
        <!-- 表头插槽 -->
        <template v-if="item.labelSlot" #header="scope">
          <slot :name="item.labelSlot" v-bind="scope" />
        </template>
        <!-- 操作列 or columns 插槽 -->
        <template v-if="item.tdSlot" #default="scope">
          <div class="table-options-button">
            <slot :name="item.tdSlot" v-bind="scope" />
          </div>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column
        v-if="props.mothods && props.mothods.length > 0"
        label="操作"
        fixed="right"
        :width="props.mothodsWidth || '200px'"
      >
        <template #default="scope">
          <div class="table-options-button">
            <template v-for="item in props.mothods" :key="item.label">
              <!-- color="#216DD9" -->
              <el-button
                :type="item.type || 'primary'"
                link
                :size="item.size || ''"
                :disabled="
                  typeof item.disabled == 'function'
                    ? item.disabled(scope.row)
                    : item.disabled || false
                "
                v-if="item.show(scope.row)"
                @click="handleClick(scope.row, item)"
                >{{ item.label }}</el-button
              >

              <template v-if="item.tdSlot">
                <div class="table-options-button">
                  <slot :name="item.tdSlot" v-bind="scope" />
                </div>
              </template>
              <!-- 更多 dropdown -->
              <template v-if="item.children && item.children.length">
                <el-dropdown popper-class="table-dropdown-popper" trigger="click" class="dropdown-list">
                  <el-button link :type="item.type">
                    更多<el-icon class="el-icon--right"><arrow-down /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item v-for="mItem in item.children.filter(f => f.show(scope.row))" :key="mItem.label">
                        <el-button
                          link
                          style="font-size: 14px;"
                          :type="mItem.type"
                          @click="handleClick(scope.row, mItem)"
                        >
                          {{ mItem.label }}
                        </el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
            </template>
          </div>
        </template>
      </el-table-column>
      <!-- 缺省 -->
      <template v-if="!haveData" #empty>
        <GlobalEmpty :description="emptyTips" />
      </template>
    </el-table>
    <el-pagination
      v-if="props.pagination.total && props.pagination.total > 0"
      :page-sizes="props.pagination.pageSizes || [10, 25, 50, 100]"
      :total="props.pagination.total"
      :page-size="pagination.pageSize"
      :current-page="pagination.pageNum"
      :pager-count="5"
      layout="->, prev, pager, next, jumper, total, sizes"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentPageChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, useSlots } from "vue";
import type { PropType } from "vue";
import { Pagination, TableMethods } from "@/core/interface/common";
import { Colums } from "@/core/interface/common";
import { ElTable } from "element-plus";

const slots = useSlots();

const emit = defineEmits([
  "sortChange",
  "sizeChange",
  "pageChange",
  "selectChange",
  "handleDelete",
  "handleMethod",
  "selectAllChange",
  "filterChange"
]);

const tableRef = ref<InstanceType<typeof ElTable>>();
defineExpose({
  tableRef,
});

const props = defineProps({
  tableData: {
    type: Array,
    require: true,
    default: () => [],
  },
  stripe: {
    type: Boolean,
    require: false,
    default: () => true,
  },
  rowKey: {
    type: String,
    require: false,
    default: "id",
  },
  columns: {
    type: Array as PropType<Colums[]>,
    require: true,
    default: () => [],
  },
  mothods: {
    type: Array as PropType<TableMethods[]>,
    require: false,
    default: () => [],
  },
  border: {
    type: Boolean,
    require: false,
    default: () => true,
    // default: false
  },
  havePagination: {
    type: Boolean,
    require: false,
    // 引用类型的值需要用函数
    // default: () => true
    default: true,
  },

  loading: {
    type: Boolean,
    default: () => true,
    require: true,
  },
  pagination: {
    type: Object as PropType<Pagination>,
    require: false,
    default: () => ({
      page: 1,
      pageSize: 10,
      total: 0,
    }),
  },

  emptyTips: {
    type: String,
    require: false,
    default: "暂无数据",
  },
  mothodsWidth: {
    type: String,
    require: false,
    default: "200px",
  },
  checkSelectable:{
    type:Function,
    require: false,
    default:()=>{
      return true
    }
  },
  // 是否分页多选
  reverseSelection: {
    type: Boolean,
    require: false,
    default: false,
  },
});
//any 避免当res 没有total，total类型报错
const haveData = ref<any>(false);
watch(
  () => props.pagination.total,
  (val) => {
    haveData.value = val && val > 0;
  },
  {
    immediate: true,
  }
);
const sortChange = (data) => {
  emit("sortChange", data);
};
const handlePageSizeChange = (val: number) => {
  emit("sizeChange", val);
};
const handleCurrentPageChange = (val: number) => {
  emit("pageChange", val);
};
const handleSelectionChange = (val: []) => {
  emit("selectChange", val);
};
const handleSelectAll = (val) => {
  emit("selectAllChange", val);
};

// 表头filter
const handleFilterChange = (val: any) => {
  emit("filterChange", val);
};

// 操作列返回表格当前行数据 & 当前操作项
const handleClick = (val: any, item: TableMethods) => {
  emit("handleMethod", { row: val, action: item });
};
const tableRowClassName = ({ rowIndex }: { rowIndex: number }) => {
  if (rowIndex % 2 != 0) {
    return "gray-table-row";
  }
};
</script>
<style lang="scss" scoped>
.table-container {
  @include tableContainer;

  // 头部 斑马纹
  :deep(.el-table__header .el-table__cell) {
    background: #f6f6f6;
  }

  // body 斑马纹
  :deep(.el-table--striped .el-table__row) {
    &:nth-child(2n) {
      .el-table__cell {
        background: #f6f6f6;
      }
    }
    &:nth-child(2n + 1) {
      .el-table__cell {
        background: #ffffff;
      }
    }
  }

  :deep(.el-table__body .hover-row) {
    .el-table__cell {
      background: #e8f2ff !important;
    }
  }

  .table-option {
    margin: 10px 0;
    display: flex;
    justify-content: flex-end;
  }

  .table-options-button {
    :deep(.el-button) {
      padding: 5px 8px;
      margin-left: 0;
      font-size: 14px;
      &:first-child {
        padding-left: 0;
      }
    }
  }
  .dropdown-list {
    :deep(.el-button) {
      padding: 5px 8px !important;
    }
  }
  :deep(.is-active) {
    background: #216dd9;
  }
  :deep(.el-pagination) {
    justify-content: center;
    position: relative;
    padding: 10px 20px;
    .el-pagination__rightwrapper {
      justify-content: center;
    }
    .el-pagination__total {
      position: absolute;
      right: 160px;
    }
    .el-pagination__sizes {
      position: absolute;
      right: 20px;
    }
  }

  // 空状态
  :deep(.el-scrollbar__view) {
    height: 100%;
  }
  :deep(.el-table__empty-text) {
    line-height: 0;
  }
  .empty-text {
    font-size: 16px;
    color: rgba(0,0,0,0.6);
    line-height: 14px;
    margin-top: 11px;
  }
}
</style>
<style lang="scss">
  .table-dropdown-popper {
    .el-dropdown-menu__item {
      padding: 6px 20px;
      .el-button--default {
        color: rgba(0, 0, 0, 0.8);
      }
      .el-button--danger {
        color: #D93021;
      }
    }
  }
</style>
