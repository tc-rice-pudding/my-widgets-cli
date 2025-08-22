<template>
  <div
    class="tree-container"
    ref="outerRef"
    :style="{ width: width ? width + 'px' : '100%' }"
  >
    <el-input
      v-if="props.filterable"
      v-model="filterText"
      type="text"
      class="filter-input"
      placeholder="请输入内容"
    >
      <template #prefix>
        <img class="search-icon" src="@/assets/svg/search.svg" alt="" />
      </template>
    </el-input>
    <div class="btn-list" ref="btnRef">
      <div
        v-if="props.showAllSelectBtn"
        class="btn"
        :class="btnStatus.allCheck ? 'active-btn' : ''"
        @click="allChecked"
      >
        {{ btnStatus.allCheck ? "取消" : "" }}全选
      </div>
      <div class="btn" v-if="props.showReserveBtn" @click="resetChecked">
        反选
      </div>
      <div
        class="btn"
        v-if="props.showExpandBtn"
        :class="btnStatus.allExpand ? 'active-btn' : ''"
        @click="expandAll"
      >
        全部{{ btnStatus.allExpand ? "收起" : "展开" }}
      </div>
      <div
        class="btn"
        v-if="props.showStrictBtn"
        :class="btnStatus.checkStrictly ? '' : 'active-btn'"
        @click="checkStrict"
      >
        {{ btnStatus.checkStrictly ? "" : "取消" }}级联选择（<span class="light"
          >选择父节点，子节点一并选中</span
        >）
      </div>
      <!-- <div class="btn">仅显示已选部门（{{ state.checkIds.length }}）</div> -->
    </div>
    <el-tree-v2
      v-if="dataSource.length"
      ref="treeRef"
      class="tree-box"
      :height="treeHeight"
      :item-size="36"
      :data="dataSource"
      :show-checkbox="props.showCheckBox"
      :node-key="props.nodeKey"
      :props="defaultProps"
      :check-strictly="btnStatus.checkStrictly"
      :default-checked-keys="props.defaultCheckedKeys"
      :default-expanded-keys="props.defaultExpandedKeys"
      :filter-method="filterNode"
      @check-change="checkChange"
    >
      <template #default="{ node, data }">
        <span>{{ node.label }}</span>
        <!-- 标识 -->
        <span class="has-auth" v-if="data[props.labelTipData?.key]">{{
          props.labelTipData?.text
        }}</span>
      </template>
      <template #empty> </template>
    </el-tree-v2>
    <GlobalEmpty
      v-else
      :style="{ height: treeHeight + 'px' }"
      :description="emptyTips"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from "vue";
import type Node from "element-plus/es/components/tree/src/model/node";
import { ElTreeV2 } from "element-plus";
import { Tree } from "./config";
import type { PropType } from "vue";

const treeHeight = ref(200);
const outerRef = ref();
const btnRef = ref();
const filterText = ref("");
const treeRef = ref<InstanceType<typeof ElTreeV2>>();
const props = defineProps({
  // width不设置，宽100%
  width: {
    type: Number,
    default: 0,
    required: false,
  },
  dataSource: {
    type: Array as PropType<Tree[]>,
    default: () => [],
    required: true,
  },
  nodeKey: {
    type: String,
    default: "id",
    required: false,
  },
  showCheckBox: {
    type: Boolean,
    default: true,
    required: false,
  },
  filterable: {
    required: false,
    default: true,
    type: Boolean,
  },
  // 默认选中
  defaultCheckedKeys: {
    required: false,
    default: [],
    type: Array,
  },
  // 默认展开
  defaultExpandedKeys: {
    required: false,
    default: [],
    type: Array,
  },
  checkStrictly: {
    required: false,
    default: false,
    type: Boolean,
  },
  customProps: {
    required: false,
    type: Object,
    default: () => {},
  },
  showAllSelectBtn: {
    required: false,
    default: true,
    type: Boolean,
  },
  // 是否展示反选按钮
  showReserveBtn: {
    required: false,
    default: true,
    type: Boolean,
  },
  // 是否展示展开全部按钮
  showExpandBtn: {
    required: false,
    default: true,
    type: Boolean,
  },
  // 是否展示级联按钮
  showStrictBtn: {
    required: false,
    default: true,
    type: Boolean,
  },
  // 是否获取半选数据
  getHalfCheck: {
    required: false,
    default: false,
    type: Boolean,
  },
  // label后面tip标识
  labelTipData: {
    required: false,
    type: Object,
    default: () => {},
  },
});

const emits = defineEmits(["handleCheckChange"]);
const state = reactive({
  checkIds: [] as any[], // 选中的id
  allNodesKeys: [] as any[], // 所有nodes id
});

// 功能按钮状态
const btnStatus = reactive({
  allCheck: false, // 是否全选
  checkStrictly: props.checkStrictly, // 是否不级联
  allExpand: false, // 是否全部展开
});

const defaultProps = ref({
  children: props.customProps?.children || "children",
  label: props.customProps?.label || "label",
  value: props.nodeKey,
});

defineExpose({
  treeRef,
  btnStatus,
});

// 计算tree高度
const getTreeHeight = () => {
  nextTick(() => {
    treeHeight.value =
      outerRef.value.offsetHeight -
      (props.filterable ? 32 : 0) -
      btnRef.value.offsetHeight -
      54;
  });
};

// 反选
const resetChecked = () => {
  const resetKesy = state.allNodesKeys.filter(
    (key) => !treeRef.value!.getCheckedKeys().includes(key)
  );
  treeRef.value!.setCheckedKeys(resetKesy);
  // 不级联, 关闭半选
  if (btnStatus.checkStrictly) {
    treeRef
      .value!.getHalfCheckedNodes()
      .forEach((item) => treeRef.value!.setChecked(item.id, false, true));
  }
  setTimeout(() => {
    checkChange({}, true);
  }, 0);
};

// 全选
const allChecked = () => {
  if (btnStatus.allCheck) {
    // 取消全选
    treeRef.value!.setCheckedKeys([]);
  } else {
    // 全选
    treeRef.value!.setCheckedKeys(state.allNodesKeys);
  }
  btnStatus.allCheck = !btnStatus.allCheck;
  setTimeout(() => {
    checkChange({}, true);
  }, 0);
};

// 全部展开/关闭
const expandAll = () => {
  btnStatus.allExpand = !btnStatus.allExpand;
  treeRef.value!.setExpandedKeys(btnStatus.allExpand ? state.allNodesKeys : []);
};

// 级联选择（选择父节点，子节点一并选中）
const checkStrict = () => {
  btnStatus.checkStrictly = !btnStatus.checkStrictly;
};

const filterNode = (value: string, data: Tree): any => {
  if (!value) return true;
  return data[props.customProps?.label || "label"].includes(value);
};

const checkChange = (data: object, checked: boolean) => {
  let all = treeRef.value!.getCheckedNodes(false);
  // 级联 去除半选
  if (!btnStatus.checkStrictly) {
    let half = treeRef.value!.getHalfCheckedKeys();
    all = all.filter((item) => !half.includes(item[props.nodeKey]));
  }
  if (all.length < state.allNodesKeys.length) {
    // 不是全选状态
    btnStatus.allCheck = false;
  }
  const checkIds = all.map((item) => item[props.nodeKey]);
  console.log(checkIds);
  state.checkIds = checkIds;
  // 是否要包含半选
  let halfList: any = [];
  if (props.getHalfCheck) {
    halfList = treeRef.value!.getHalfCheckedNodes();
    halfList.forEach((item) => (item.isHalf = true));
  }
  emits("handleCheckChange", all.concat(halfList));
};

// 递归拿到allNodes
const getAllNodesRecursive = (nodes) => {
  const result = [];
  const processNode = (node) => {
    result.push(node);
    if (node.children) {
      node.children.forEach(processNode);
    }
  };
  nodes.forEach(processNode);
  state.allNodesKeys = result.map((item: any) => item[props.nodeKey]);
};

watch(filterText, (val) => {
  treeRef.value!.filter(val);
});

watch(
  () => props.defaultCheckedKeys,
  (val: any) => {
    if (val && val.length) {
      state.checkIds = val;
      nextTick(() => {
        treeRef.value!.setCheckedKeys(val);
      });
    } else {
      state.checkIds = [];
      nextTick(() => {
        treeRef.value!.setCheckedKeys([]);
      });
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

watch(
  () => state.checkIds,
  (val: any) => {
    if (val && val.length && val.length === state.allNodesKeys.length) {
      btnStatus.allCheck = true;
    } else {
      btnStatus.allCheck = false;
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

watch(
  () => props.dataSource,
  (val: any) => {
    getAllNodesRecursive(props.dataSource);
    getTreeHeight();
    window.onresize = () => {
      getTreeHeight();
    };
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>
<style lang="scss" scoped>
.tree-container {
  height: 100%;
  padding: 16px 20px 0;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.05),
    0px 4px 5px 0px rgba(0, 0, 0, 0.08), 0px 2px 4px -1px rgba(0, 0, 0, 0.12);
  :deep(.el-input) {
    font-size: 14px;
  }
  .filter-input {
    .search-icon {
      width: 13.5px;
      height: 13.5px;
      margin-right: 4px;
    }
  }
  .btn-list {
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    .btn {
      background-color: rgba(40, 119, 255, 0.1);
      border-radius: 4px;
      font-size: 12px;
      height: 25px;
      line-height: 25px;
      padding: 0 8px;
      color: rgba(0, 0, 0, 0.6);
      font-weight: 400;
      .light {
        color: rgba(0, 0, 0, 0.4);
      }
    }
    .active-btn {
      background-color: #216dd9;
      color: #ffffff;
      .light {
        color: rgba(255, 255, 255, 0.4);
      }
    }
  }
  .tree-box {
    margin-top: 16px;
    // height: calc(100% - 100px);
    // :deep(.el-vl__wrapper) {
    //   height: 100%;
    // }
    // :deep(.el-vl__window) {
    //   height: 100% !important;
    // }
    :deep(.el-tree-node__label) {
      font-size: 14px;
    }
    :deep(.el-checkbox__inner) {
      width: 16px;
      height: 16px;
      &::after {
        left: 5px;
        height: 8px;
        border-width: 2px;
      }
      &::before {
        height: 4px;
      }
    }
    .has-auth {
      border-radius: 4px;
      border: 1px solid #1bb327;
      padding: 0 4px;
      color: #1bb327;
      line-height: 18px;
      margin-left: 4px;
    }
  }
}
</style>
