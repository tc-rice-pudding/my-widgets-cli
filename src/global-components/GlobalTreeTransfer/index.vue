<template>
  <div class="transfer-container">
    <div class="transfer-left transfer-common">
      <div class="transfer-title f14">
        <el-checkbox
          class="checkbox"
          v-model="state.leftCheckAll"
          :indeterminate="state.isLeftIndeterminate"
          @change="handleCheckAllChangeLeft"
        ></el-checkbox>
        {{ leftCheckLength }} items
      </div>
      <div class="transfer-content">
        <div class="filter-text-content" v-if="props.filterable">
          <el-input v-model.trim="filterText" placeholder="请输入内容" />
        </div>
        <el-tree
          class="el-tree"
          ref="treeRef"
          :data="props.dataSource"
          show-checkbox
          default-expand-all
          node-key="id"
          :filter-node-method="filterNode"
          highlight-current
          @check="checkTree"
        />
      </div>
    </div>
    <div class="transfer-buttons">
      <div class="pointer" @click="moveRight">
        <el-icon><ArrowRightBold color="#000000" /></el-icon>
      </div>
      <div class="pointer" @click="moveLeft">
        <el-icon><ArrowLeftBold color="#000000" /></el-icon>
      </div>
    </div>
    <div class="transfer-right transfer-common">
      <div class="transfer-title f14">
        <el-checkbox
          class="checkbox"
          v-model="state.rightCheckAll"
          :indeterminate="state.isRightIndeterminate"
          @change="handleCheckAllChangeRight"
        ></el-checkbox>
        {{ state.rightDataSource.length || 0 }} items
      </div>
      <div class="transfer-content">
        <el-checkbox-group
          class="checkbox-container"
          v-model="state.rightCheck"
          @change="handleCheckRight"
        >
          <div
            class="checkbox-label f14"
            v-for="item in state.rightDataSource"
            :key="item.id"
          >
            <el-checkbox :label="item.id">
              {{ item.label || "" }}
            </el-checkbox>
            <span
              :class="[
                'label-btn',
                'pointer',
                item.isMainOrg === 1 ? 'active-label-btn' : '',
              ]"
              @click.stop="setMainOrg(item.id)"
              >{{ item.isMainOrg === 1 ? "主部门" : "设置主部门" }}</span
            >
          </div>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
import { ElTree } from "element-plus";
import { Tree } from "./config";

const props = defineProps({
  filterable: {
    type: Boolean,
    required: false,
    default: true,
  },
  dataSource: {
    type: Array,
    require: true,
    default: [],
  },
  defaultKey: {
    type: Array,
    require: false,
    default: [],
  },
});

const filterText = ref("");
const leftCheckLength = ref(0);
const emits = defineEmits([
  "handleClickMoveLeft",
  "handleClickMoveRight",
  "handleRightDataChange",
]);
const treeRef = ref<InstanceType<typeof ElTree>>();

const state = reactive({
  titles: ["Source", "Target"],
  leftCheckAll: false,
  isLeftIndeterminate: false,
  rightCheckAll: false,
  isRightIndeterminate: false,
  leftCheck: [],
  rightCheck: [],
  leftDataSource: [],
  rightDataSource: [],
});

watch(
  () => filterText.value,
  (val) => {
    treeRef.value!.filter(val);
  }
);

const filterNode = (value: string, data: Tree): any => {
  if (!value) return true;
  return data.label.includes(value);
};

// 左侧全选
const handleCheckAllChangeLeft = (val) => {
  state.leftCheckAll = val;

  let dataSource = props.dataSource;
  if (!dataSource.length) return;
  dataSource.forEach((item: any) => {
    treeRef.value!.setChecked(item.id, val, true);
  });

  if (val) {
    let list = treeRef.value!.getCheckedNodes(false, false) || [];
    leftCheckLength.value = list.length;
  } else {
    leftCheckLength.value = 0;
  }
};

// 右侧全选
const handleCheckAllChangeRight = (val) => {
  let rightDataSource = state.rightDataSource;
  // 半选状态全选
  if (val) {
    let rightCheck = rightDataSource.map((item: any) => item.id);
    state.rightCheck = rightCheck as [];
    state.rightCheckAll = true;
    state.isRightIndeterminate = false;
    return;
  }
  // 全选状态清空
  if (!val) {
    state.rightCheck = [];
    state.rightCheckAll = false;
    state.isRightIndeterminate = false;
  }
};

const checkTree = (data, checkedInfo) => {
  const { checkedKeys, halfCheckedKeys } = checkedInfo;
  leftCheckLength.value = checkedKeys.length;
  state.isLeftIndeterminate = !!checkedKeys.length;

  // 判断是否全选
  let allKeys = props.dataSource.map((item: any) => item.id);
  let flag = allKeys.every((item) => {
    return checkedKeys.includes(item);
  });
  state.leftCheckAll = flag;
  state.isLeftIndeterminate = !!halfCheckedKeys.length;
};

// 左移
const moveLeft = () => {
  let rightCheck: number[] = state.rightCheck,
    rightDataSource = state.rightDataSource;
  if (!rightCheck.length) return;
  // 1、取消左侧的选中态
  rightCheck.forEach((item) => {
    treeRef.value!.setChecked(item, false, false);
  });
  // 2、将右侧选中的数据删除
  rightDataSource = rightDataSource.filter((item: any) => {
    if (!rightCheck.includes(item.id)) {
      return item;
    }
  });
  // 3、判断是否全部穿梭 回复默认状态
  if (!rightDataSource.length) {
    state.isRightIndeterminate = false;
    state.rightCheckAll = false;
    state.rightCheck = [];
    state.isLeftIndeterminate = false;
    state.leftCheckAll = false;
  }
  state.rightDataSource = rightDataSource;
  emits("handleClickMoveLeft", rightDataSource);
  emits("handleRightDataChange", rightDataSource);
};

// 右移
const moveRight = () => {
  let list = treeRef.value!.getCheckedNodes(false, false) || [];
  if (!list.length) return;
  state.rightDataSource = list as [];
  emits("handleClickMoveRight", list);
  emits("handleRightDataChange", list);
};

// 右侧数据changeChecked
const handleCheckRight = (val) => {
  if (!val.length) {
    state.rightCheckAll = false;
    state.isRightIndeterminate = false;
    return;
  }
  state.rightCheckAll = val.length === state.rightDataSource.length;
  state.isRightIndeterminate = val.length !== state.rightDataSource.length;
};

const setMainOrg = (id) => {
  let list = state.rightDataSource;
  list.forEach((item: any) => {
    item.isMainOrg = item.id === id ? 1 : 0;
  });
  emits("handleRightDataChange", list);
};

const echoInfo = () => {
  props.defaultKey.forEach((item: any) => {
    treeRef.value!.setChecked(item.orgId, true, true);
  });
  let list = treeRef.value!.getCheckedNodes(false, false) || [];
  // 左侧回显示个数
  leftCheckLength.value = list.length;
  // 对应部门状态
  list.forEach((item) => {
    let orgIndex = props.defaultKey.findIndex(
      (key: any) => key.orgId === item.orgId
    );
    if (orgIndex >= 0) {
      item.isMainOrg = props.defaultKey[orgIndex]!.isMainOrg || 0;
    }
  });
  state.rightDataSource = list as [];
};

watch(
  () => props.defaultKey,
  (val) => {
    if (val.length) {
      echoInfo();
    }
  }
);
</script>
<style scoped lang="scss">
.transfer-container {
  display: flex;
  flex-wrap: wrap;
  // :deep(.el-transfer__buttons) {
  //   display: inline-block;
  // }
  .transfer-common {
    width: 288px;
    height: 240px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    display: flex;
    flex-direction: column;
    .transfer-title {
      height: 40px;
      display: flex;
      align-items: center;
      padding-left: 12px;
      box-shadow: inset 0px -1px 0px 0px rgba(5, 5, 5, 0.06);
      .checkbox {
        margin-right: 10px;
        color: rgba(0, 0, 0, 0.8);
      }
    }
    .transfer-content {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      .filter-text-content {
        width: 260px;
        height: 32px;
        margin: 10px auto;
      }
      .el-tree {
        flex: 1;
        overflow-y: auto;
        // height: 100%;
        // background: #f00;
      }
    }
  }
  .transfer-right {
    .checkbox-container {
      display: flex;
      flex-direction: column;
    }
    .checkbox-label {
      width: 100%;
      height: 32px;
      padding: 0 18px 0 12px;
      font-weight: 400;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // :deep(.el-checkbox__label) {
      //   flex: 1;
      //   display: flex;
      //   justify-content: space-between;
      //   align-items: center;
      //   color: #333;
      // }
      .label-btn {
        color: #333;
      }
      .active-label-btn {
        color: #216dd9;
      }
    }
  }
  .transfer-buttons {
    display: flex;
    width: 56px;
    height: 198px;
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div {
      width: 24px;
      height: 24px;
      background: rgba(0, 0, 0, 0.04);
      border-radius: 4px;
      border: 1px solid #d9d9d9;
      text-align: center;
      line-height: 24px;
      margin: 8px 0;
    }
  }
}
</style>