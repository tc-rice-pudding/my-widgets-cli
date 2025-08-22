<template>
  <div class="tree-container">
    <div class="userInfo" v-if="props.treeName">{{ props.treeName }}</div>
    <div class="filter-text-content" v-if="props.filterable">
      <el-input
        class="filter-input"
        v-model="filterText"
        placeholder="请输入内容"
      />
      <slot name="add-icon"></slot>
    </div>
    <slot name="tabs"></slot>

    <GlobalEmpty style="height: calc(100% - 58px);" v-if="!dataSource.length" :description="props.emptyDescription"/>
    <el-tree
      v-else
      ref="treeRef"
      :data="dataSource"
      :show-checkbox="props.showCheckBox"
      :node-key="props.nodeKey"
      :default-expand-all="true"
      :props="defaultProps"
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      :default-checked-keys="props.defaultCheckedKeys"
      @node-click="handleChoose"
      @check="handleChoose"
    >
      <template #default="{ node, data }">
        <div
          class="custom-tree-node"
          :class="{
            'active-node': [+state.activeNodeId].includes(data.id),
          }"
          @mouseenter="data.showAction = true"
          @mouseleave="data.showAction = false"
        >
          <slot
            v-if="props.showCustomLabel"
            name="customLabel"
            v-bind="{ node, data }"
          />
          <div v-else class="custom-tree-node-content">
            <template v-if="props.showLabelIcon">
              <img
                v-if="props.nodeIcon"
                class="custom-tree-node-icon"
                :style="nodeIconStyle"
                :src="props.nodeIcon"
                alt=""
              />
              <el-icon v-else>
                <img
                  v-if="validURL(data.icon)"
                  class="custom-tree-node-icon"
                  :src="data.icon"
                  alt=""
                />
                <component v-else :is="data.icon || 'Folder'" />
              </el-icon>
            </template>
            <span v-else class="tree-node-text">
              {{ filterLabelLength(data.label || "") }}
              <span v-if="props.showLabelId" style="color: #ccc"
                >({{ "ID: " + data.id }})</span
              >
            </span>
          </div>
          <div v-if="props.showContextMenu">
            <el-popover
              :placement="props.menusPlacement"
              ref="popoverRef"
              width="auto"
              trigger="click"
              :visible="data.visible"
              popper-class="popover-intree"
            >
              <ul>
                <li
                  v-for="item in props.contextMenu"
                  :ref="(el: refItem) => setRefMap(el, data)"
                  :key="item.value"
                  :style="{
                    color: item.color || '',
                    textAlign: item.align || 'center',
                  }"
                  class="context-tree-menu-item"
                  @click="handleClickMenu(data, item)"
                >
                  {{ item.name }}
                </li>
              </ul>
              <template #reference>
                <el-icon
                  @click.stop="doAction(node, data), (data.showAction = true)"
                  class="more-filled"
                >
                  <MoreFilled />
                </el-icon>
              </template>
            </el-popover>
            <template>
              <!-- <el-popover
                :ref="(el: refItem) => setPopRefMap(el, data)"
                :virtual-ref="`action${data.id}`"
                trigger="click"
                title="With title"
                virtual-triggering
              >
                <span> Some content </span>
              </el-popover> -->
            </template>
          </div>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts" setup>
import { unref, onBeforeUnmount, ref, watch, onMounted, reactive } from "vue";
import type Node from "element-plus/es/components/tree/src/model/node";
import { useUserInfo } from "@/core/hooks/useUserInfor";
import { Tree } from "./config";
// dataSource
import { ElTree } from "element-plus";
import type { PropType } from "vue";

import { ClickOutside as vClickOutside } from "element-plus";
import type { ComponentPublicInstance } from "vue";
import { validURL } from "@/utils/validate";
type refItem = Element | ComponentPublicInstance | null;

interface contextMenu {
  name: string;
  method: string;
  value: string;
  color?: string;
  align?: string;
}
const props = defineProps({
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
  nodeIcon: {
    type: String,
    required: false,
    default: "",
  },
  emptyDescription: {
    type: String,
    required: false,
    default: "暂无数据",
  },
  nodeIconStyle: {
    type: Object,
    required: false,
    default: {
      width: "30px",
    },
  },
  showCheckBox: {
    type: Boolean,
    default: false,
    required: false,
  },
  showCustomLabel: {
    type: Boolean,
    required: false,
    default: false,
  },
  contextMenu: {
    type: Array as PropType<contextMenu[]>,
    required: false,
    default: () => {
      let menu = [
        {
          name: "添加",
          method: "add",
        },
        {
          name: "修改",
          method: "edit",
        },
        {
          name: "删除",
          method: "del",
          color: "#d93021",
        },
      ];
      return menu;
    },
  },
  showContextMenu: {
    required: false,
    default: true,
    type: Boolean,
  },
  filterable: {
    required: false,
    default: true,
    type: Boolean,
  },
  showLabelIcon: {
    required: false,
    default: true,
    type: Boolean,
  },
  showLabelId: {
    required: false,
    default: true,
    type: Boolean,
  },
  menusPlacement: {
    required: false,
    default: "bottom",
    type: String,
  },
  defaultCheckedKeys: {
    required: false,
    default: [],
    type: Array,
  },
  treeName: {
    required: false,
    default: "",
    type: String,
  },
  activeNodeId: {
    required: false,
    default: "",
    type: [String, Number],
  },
});

const emits = defineEmits([
  "updateTreeMenu",
  "handleClickTreeMenu",
  "handleChoose",
]);
const buttonRef = ref();
const popoverRef = ref();
const state = reactive({
  Flag: false,
  clientX: 0,
  clientY: 0,
  activeId: -1,
  dataSource: [] as Tree[],
  activeNodeId: props.activeNodeId, //选中的节点id
});
// const {dataSource} = toRefs(props);
// const list:Tree[] = props.dataSource || []
// state.dataSource = list;
state.dataSource = props.dataSource;

const defaultProps = {
  children: "children",
  label: "label",
};
const refMap: Record<string, refItem> = {};
const setRefMap = (el: refItem, item: Tree) => {
  if (el) {
    refMap[`action${item.id}`] = el;
  }
};
const refPopMap: Record<string, refItem> = {};

const setPopRefMap = (el: refItem, item: Tree) => {
  if (el) {
    refPopMap[`pop${item.id}`] = el;
  }
};

const filterText = ref("");
const treeRef = ref<InstanceType<typeof ElTree>>();

defineExpose({
  treeRef,
});

const { userInfo } = useUserInfo();

let id = 1000;

const doAction = (node: any, data: Tree) => {
  state.activeId = data.id;
  data.visible = true;

  // unref(popoverRef).popperRef?.delayHide?.();
  // const newChild = { id: id++, label: "testtest", children: [] };
  // if (!data.children) {
  //   data.children = [];
  // }
  // data.children.push(newChild);
};

const remove = (node: Node, data: Tree) => {
  const parent = node.parent;
  const children: Tree[] = parent.data.children || parent.data;
  const index = children.findIndex((d) => d.id === data.id);
  children.splice(index, 1);
};

const filterNode = (value: string, data: Tree): any => {
  if (!value) return true;
  return data.label.includes(value);
};
const handleClickDoc = (e) => {
  state.dataSource = recursive(state.activeId, state.dataSource);
};

const handleChoose = (item) => {
  state.activeNodeId = item.id;
  emits("handleChoose", item);
};
//递归隐藏所有的菜单
const recursive = (id?: any, menus?: any) => {
  menus.forEach((item, i) => {
    if (id && item.id == id) {
      item.visible = false;
      item.showAction = false;
    }
    // if (!id) {
    //   item.visible = false;
    // }
    // 减少递归次数
    if (item.children && item.children.length) {
      recursive(id, item.children);
    }
  });
  return menus;
};
const handleClickMenu = (data: Tree, obj: contextMenu) => {
  if (refMap[`action${data.id}`]) {
    // unref(refPopMap[`pop${data.id}`]).refPopMap[`pop${data.id}`?.delayHide?.();
  }
  console.log(data, obj);

  emits("handleClickTreeMenu", { data, method: obj });
};

const filterLabelLength = (val: string) => {
  if (!val) return "";
  if (val.length <= 10) return val;
  if (val.length > 10) return val.slice(0, 10) + "...";
};

// const handleCheckChange = (data, checked) => {
//   console.log(data, checked);
// }

watch(filterText, (val) => {
  treeRef.value!.filter(val);
});
watch(
  () => props.dataSource,
  (val) => {
    if (!val) return;
    state.dataSource = val;
  }
);
watch(
  () => props.activeNodeId,
  (val) => {
    state.activeNodeId = val;
  },
  {
    immediate: true,
  }
);
watch(
  () => props.activeNodeId,
  (val) => {
    if (!val) return;
    state.activeNodeId = val;
  }
);
onMounted(() => {
  (window as any).addEventListener("click", handleClickDoc);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", handleClickDoc);
});
</script>
<style lang="scss" scoped>
.filter-text-content {
  padding: 16px;
  // padding-bottom: 16px;
  background-color: #fff;
  display: flex;
  .filter-input {
    flex: 1;
  }
}

:deep(.el-tree-node > .el-tree-node__children) {
  overflow: inherit;
}

.active-node {
  color: #216dd9;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 12px;
}

.tree-container {
  position: relative;

  ._tree {
    color: #444;
    padding-left: 6px;
    overflow: auto;

    //更改tree的默认图标颜色，图标是否为叶子节点都会出现
    // span {
    //   color: $icon_color;
    // }
    // .is-leaf {
    //   color: transparent;
    // }
    .tree_label {
      font-size: 14px;
      letter-spacing: 1px;
      margin-left: 5px;
    }
  }

  .popover-intree {
    position: absolute;

    ul {
      padding: 3px;
    }

    li {
      list-style: none;
    }
  }

  .el-popover {
    padding: 0px;
    min-width: 20px;
    border: 1px solid #ebeef5;
    border-radius: 0;
    box-shadow: 4px 4px 4px -4px rgb(121, 118, 118);
  }

  .el-tree {
    margin-top: 10px;
    padding-left: 10px;
  }

  //重写tree的 active样式
  .el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    background: $menuActiveBg;
    color: #fff;
  }

  //重写tree样式，才可使横向 超出显示滚动条
  .el-tree > .el-tree-node {
    min-width: 100%;
    display: inline-block;
  }

  :deep(.el-tree-node__content) {
    height: 32px;
    line-height: 32px;
  }

  .custom-tree-node-content {
    font-size: 16px;
    display: flex;
    align-items: center;
  }
  .custom-tree-node-icon {
    width: 30px;
  }

  .tree-node-text {
    // margin-left: 8px;
  }

  .custom-tree-node div .more-filled {
    transform: rotate(90deg);
  }
}
</style>

<style lang="scss">
.context-tree-menu-item {
  letter-spacing: 1px;
  color: #222;
  cursor: pointer;
  height: 35px;
  line-height: 35px;
  color: #000;
  text-align: center;
  padding: 0 20px !important;
  box-sizing: border-box;

  // text-indent: 20px;
  // font-size: 25px;
  &:hover {
    border-radius: 2px;
    background: #f5f7fa;
    color: black;
  }
}

.popover-intree {
  padding: 10px 0px !important;
}
</style>
