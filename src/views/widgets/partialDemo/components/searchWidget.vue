<template>
  <el-popover
    :show-arrow="false"
    :width="`${props.inputWidth}px`"
    placement="bottom-end"
  >
    <template #reference>
      <el-input
        v-model="state.keyword"
        clearable
        @keyup.enter.native="handleEnter"
        :placeholder="props.placeholder"
        class="input-with-select"
        :prefix-icon="Search"
      >
        <template #prepend v-if="props.showPrepend">
          <el-select v-model="state.keywordType" class="select-class">
            <el-option label="全部系统" value="全部系统" />
            <el-option label="当前系统" value="当前系统" />
          </el-select>
        </template>
      </el-input>
    </template>
    <section class="search-container">
      <header>
        <span>历史记录</span>
        <el-button type="info" text link @click="conditionStore.clearCondition">
          <el-icon style="margin-right: 4px">
            <Delete />
          </el-icon>
          删除
        </el-button>
      </header>
      <ul v-if="conditionStore.conditions.length">
        <li
          v-for="it in conditionStore.conditions"
          :key="it"
          @click="state.keyword = it"
        >
          {{ it }}
        </li>
      </ul>
      <el-empty v-else />
    </section>
  </el-popover>
</template>

<script setup lang='ts'>
import { Search } from "@element-plus/icons-vue";
import { useCondition } from "@/pinia/modules/searchCondition";

interface Props {
  condition: {
    keywordType: string;
    keyword: string;
  };
  showPrepend: boolean;
  inputWidth: number;
  placeholder: string;
}
const props = withDefaults(defineProps<Props>(), {
  showPrepend: true,
  inputWidth: 400,
  placeholder: "请输入",
});
const emits = defineEmits(["update:condition"]);

const widthRef = computed(
  () => `${props.showPrepend ? props.inputWidth + 114 : props.inputWidth}px`
);

const conditionStore = useCondition();
const state = reactive({
  keywordType: "全部系统",
  keyword: "",
});

const handleEnter = () => {
  conditionStore.addCondition(state.keyword);
};

watchEffect(() => {
  emits("update:condition", {
    keywordType: state.keywordType,
    keyword: state.keyword,
  });
});
</script>

<style scoped lang='scss'>
.input-with-select {
  height: 34px;
  font-size: 14px;
  width: v-bind("widthRef");

  .select-class {
    width: 114px;
    height: 34px;
  }

  .el-input__wrapper {
    width: v-bind("props.inputWidth") + px;
  }
}
:deep .el-input-group__prepend {
  box-shadow: none;
}

:deep .el-select__wrapper {
  height: 34px;
}
</style>
<style lang="scss">
.search-container {
  > header {
    height: 34px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    top: -8px;
  }

  > ul {
    max-height: 200px;
    overflow: auto;

    > li {
      line-height: 30px;
      transition: all 0.3s;
      padding: 0 4px;
      cursor: pointer;

      &:hover {
        background: #f6f6f6;
      }
    }
  }
}
</style>