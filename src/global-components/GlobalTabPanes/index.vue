<template>
  <el-tabs :type="cardType" :model-value="tabName" @tab-click="handleClick">
    <el-tab-pane
      v-for="item in tabList"
      :key="item.id"
      :label="item.label"
      :name="item.label"
    >
      <template v-if="!!item.domSlot">
        <slot :name="item.domSlot" v-bind="item" />
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { reactive, toRefs, watch } from "vue";

export default {
  props: {
    tabList: {
      type: Array,
      default() {
        return [];
      },
    },
    cardType: {
      type: String,
      default: "",
    },

    tabPosition: {},
  },
  setup(props, context) {
    const state = reactive({
      tabName: props.tabList[0].label,
      handleClick(tab, event) {
        context.emit("handleClick", { tab, event });
      },
    });
    onMounted(() => {
      state.tabName = props.tabList[0].label;
      console.log("state.tabName", state.tabName);
    });
    watch(
      () => props.tabPosition,
      (val) => {
        if (props.tabPosition) {
          state.tabName = val;
        }
      }
    );
    return toRefs(state);
  },
};
</script>

<style lang="scss">
// .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
//   background: rgba(40, 70, 255, 0.1);
//   // color: $mainColor;
// }

// .el-tabs--border-card>.el-tabs__header .el-tabs__item {
//   // color: $elTabsFontColor;
//   background: #F9F9F9;
// }

// // tabs ui设计:start
// .el-tabs--border-card {
//   border: none;
//   box-shadow: none;
// }

// .el-tabs__nav-wrap {
//   background: white;
// }

// .el-tabs__item {
//   margin-right: 10px;
//   height: 34px;
//   line-height: 34px;
//   border: none;
// }

// tabs ui设计:end
</style>
