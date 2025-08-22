<template>
  <div class="page-box">
    <!-- 分页 -->
    <el-pagination
      v-if="paginationConfig.show && total > 0"
      v-model:currentPage="page"
      v-model:pageSize="pageSize"
      class="pagination"
      :style="paginationConfig.style"
      :page-sizes="paginationConfig.pageSizes"
      :layout="paginationConfig.layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, watch } from "vue";

export default defineComponent({
  props: {
    total: {
      type: Number,
      default: 0,
    },
    pageNum: {
      type: Number,
      default: 1,
    },
    // 分页配置，false表示不显示分页
    pagination: {
      type: [Boolean, Object],
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      loading: false,
      tableData: [],
      page: 1,
      pageSize: (!!props.pagination && props.pagination.pageSize) || 10,
      paginationConfig: {
        show: false,
      },

      // 当前页变化
      handleCurrentChange() {
        emit("handlePaginationChange", {
          page: state.page,
          pageSize: state.pageSize,
        });
      },
      // 改变每页size数量
      handleSizeChange() {
        emit("handlePaginationChange", {
          page: state.page,
          pageSize: state.pageSize,
        });
      },
    });

    if (typeof props.pagination === "object") {
      const { layout, pageSizes, style } = props.pagination;
      state.paginationConfig = {
        show: true,
        // pageNum: pageNum || 1,
        layout: layout || "total, sizes, prev, pager, next, jumper",
        pageSizes: pageSizes || [10, 20, 30, 40, 50, 100],
        style: style || { textAlign: "right" },
      };
    }
    watch(
      () => props.pageNum,
      (val) => {
        state.page = val;
      }
    );
    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>
.page-box {
  width: 100%;
  box-sizing: border-box;
  .search {
    padding: 20px 20px 0;
    background: #fff;
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      margin-bottom: 20px;
    }
    .search-btn {
      margin-left: auto;
    }
    :deep(.el-input-number .el-input__inner) {
      text-align: left;
    }
  }

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 0;
    background: #fff;
    .title {
      font-size: 16px;
    }
  }
  .table {
    // padding: 20px;
    background: #fff;
  }
  .el-table--border th,
  .el-table--border td {
    border-right: none;
  }
  .table {
    :deep(.el-table__empty-block) {
      min-height: 35px;
    }
    :deep(.el-table th > .cell) {
      font-size: 13px;
    }
    :deep(.el-table__empty-text) {
      line-height: 35px;
    }
    :deep(.el-table--mini th) {
      font-weight: normal;
      color: black;
      text-align: center;
      padding: 0;
      font-size: 12px;
      border-right: none;
    }
    :deep(.el-table--mini th:last-child) {
      border-right: var(--el-table-border);
    }

    .el-table :deep(th) {
      font-weight: normal;
      color: black;
      text-align: center;
      padding: 0;
      font-size: 12px;
    }
    .el-table :deep(td) {
      text-align: center;
      font-size: 12px;
      border-right: none;
    }
  }
  .pagination {
    padding: 30px 20px 20px;
    background: #fff;
    text-align: right;
    // :last-child {
    // margin-right: 0;
    // }
  }
}
</style>
