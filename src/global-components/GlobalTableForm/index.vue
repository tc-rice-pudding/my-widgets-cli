<template>
  <div class="search-container">
    <div class="left-table-filter">
      <el-form
        ref="formRef"
        :inline="true"
        :model="formFieldsValue"
        :rules="rulesInline"
      >
        <template v-for="item in props.formFieldsOptions" :key="item.field">
          <el-form-item :prop="item.field" :label="item.label">
            <el-input
              v-if="item.type == 'input'"
              v-model="formFieldsValue[item.field]"
              :style="{ width: item.width ? item.width : '195px' }"
              :maxlength="item.maxlength"
              :clearable="item.clearable || true"
              :placeholder="item.placeholder || '请输入内容'"
            />
            <el-select
              v-if="item.type == 'select'"
              :filterable="item.filterable || true"
              :clearable="item.clearable || true"
              :multiple="item.multiple || false"
              v-model="formFieldsValue[item.field]"
              :style="{ width: item.width ? item.width : '190px' }"
              @change="
                (value) => {
                  onSelect(value, item);
                }
              "
              :placeholder="item.placeholder || '请选择'"
            >
              <el-option
                v-for="option in item.options"
                :value="option[item.optionKey || 'value']"
                :key="option[item.optionKey || 'value']"
                :label="option[item.optionName || 'label']"
              />
            </el-select>
            <el-date-picker
              v-if="
                ['year', 'month', 'datetime', 'daterange'].includes(item.type)
              "
              v-model="formFieldsValue[item.field]"
              clearable
              :type="item.type"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :value-format="item.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
              :disabled-date="item.disabledDate ? null : disabledDate"
              @calendar-change="timePickHandle"
              @change="timePickChange"
            />
            <!-- tree选择 -->
            <el-select
              v-if="item.type === 'tree-select'"
              v-model="formFieldsValue[item.field]"
              clearable
              multiple
              collapse-tags
              :max-collapse-tags="2"
              popper-class="tree-select-header"
              class="tree-select"
              :placeholder="item.placeholder || '请选择'"
              @visible-change="selectVisibleChange"
            >
              <!-- #header 需要element plus @2.4.3+ -->
              <template #header>
                <GlobalTreeV2
                  ref="globalFormTree"
                  v-if="item.options.length"
                  :dataSource="item.options"
                  :defaultCheckedKeys="
                    formFieldsValue[item.field]?.map((m) => m.id)
                  "
                  :customProps="item.props"
                  :width="500"
                  :checkStrictly="true"
                  :nodeKey="item.props.value"
                  @handleCheckChange="handleCheckChange($event, item)"
                />
              </template>
              <!-- 使用方法 -->
              <!-- {
                field: "orgIds",
                type: "tree-select",
                label: "组织机构",
                props: {
                  value: "id",
                  label: "label",
                },
                placeholder: "请选择组织机构",
                options: []
              } -->
            </el-select>
            <el-radio-group
              v-if="item.type == 'radio'"
              v-model="formFieldsValue[item.field]"
            >
              <el-radio
                style="margin-right: 15px"
                v-for="option in item.options"
                :key="option[item.optionKey || 'value']"
                :label="option[item.optionKey || 'value']"
                >{{ option[item.optionName || "label"] }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
        </template>
      </el-form>
    </div>
    <!-- 1:是否需要操作项 2:默认操作项 3:自定义操作项 4:默认+自定义操作项 -->
    <div class="right-btn">
      <template v-if="showDefaultAction">
        <el-button v-debounce="resetForm"> 重置 </el-button>
        <el-button
          plain
          tag="div"
          color="#216DD9"
          class="checked-form-btn"
          v-debounce="searchByForm"
        >
          查询
        </el-button>
      </template>
      <slot name="btnAction" />
    </div>

    <div v-if="props.showExpand" class="expand">
      <template v-if="isExpand">
        <span @click="toggleExpand"> 展开筛选条件 </span>
        <el-icon><ArrowDown /></el-icon>
      </template>
      <template v-else>
        <span @click="toggleExpand">收起筛选条件 </span>
        <el-icon><ArrowUp /></el-icon>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, useSlots } from "vue";
import type { PropType } from "vue";
import { FormFiles } from "@/core/interface/common";
import type { FormInstance } from "element-plus";
const emit = defineEmits(["tableReset", "tableFilter"]);

const props = defineProps({
  formFieldsOptions: {
    require: true,
    type: Array as PropType<FormFiles[]>,
    default: () => [],
  },
  rulesInline: {
    require: false,
    type: Object as PropType<any>,
    default: () => [],
  },
  formFieldsValue: {
    require: false,
    type: {} as any,
    default: () => {},
  },
  hasAction: {
    require: false,
    type: Boolean,
    default: true,
  },
  showDefaultAction: {
    require: false,
    type: Boolean,
    default: true,
  },
  showExpand: {
    require: false,
    type: Boolean,
    default: false,
  },
  labelMinWidth: {
    require: false,
    type: Number,
    default: 110,
  },
});
const state = reactive({
  startTime: "",
  timestemp: "",
}) as any;
const formFieldsValue = ref({});
watch(
  () => props.formFieldsOptions,
  (val) => {
    val &&
      val.forEach((item) => {
        if (item.defaultValue != undefined) {
          formFieldsValue.value[item.field] = item.defaultValue;
        }
      });
  },
  { deep: true, immediate: true }
);

const formRef = ref<FormInstance>();
const disabledDate = (time: any) => {
  const limitTime = 31 * 24 * 3600 * 1000;
  if (state.startTime) {
    return (
      time.getTime() < state.startTime - 24 * 3600 * 1000 - limitTime ||
      time.getTime() > state.startTime - 24 * 3600 * 1000 + limitTime ||
      time.getTime() > Date.now()
    );
  } else {
    return time.getTime() > Date.now();
  }
};

const timePickHandle = ([start, end]: any) => {
  state.startTime = "";
  state.startTime = start.getTime();
};

const timePickChange = (data: any) => {
  let beginTime = "";
  let endTime = "";
  if (data) {
    beginTime = data[0];
    endTime = data[1];
  } else {
    state.startTime = "";
  }
  endTime = endTime.replace("00:00:00", "23:59:59");
  const field = props.formFieldsOptions.find((item) =>
    ["year", "month", "datetime", "daterange"].includes(item.type)
  )?.field;
  if (field) {
    formFieldsValue.value[field] = [beginTime, endTime];
  }
};
const onSelect = (val, item) => {
  console.log(val, item);
};
const resetForm = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
  emit("tableReset", {});
};
const searchByForm = () => {
  emit("tableFilter", { ...formFieldsValue.value });
};

const handleCheckChange = (data, item) => {
  formFieldsValue.value[item.field] = data.map((m) => ({
    id: m[item.props.value],
    label: m[item.props.label],
  }));
};

const selectVisibleChange = (val: boolean) => {
  if (val) {
    document.body.style.overflow = "hidden";
  }
};

const isExpand = ref(false);
const searchContainerHeight = ref("auto");
const paddingBottom = ref(props.showExpand ? `26px` : 0);
const toggleExpand = () => {
  isExpand.value = !isExpand.value;
  searchContainerHeight.value = isExpand.value ? "95px" : "auto";
};

defineExpose({
  searchByForm,
  resetForm,
});
</script>
<style lang="scss" scoped>
.search-container {
  // display: flex;
  // justify-content: space-between;
  // padding: 20px;
  width: 100%;
  background-color: #fff;
  padding-left: 20px;
  height: v-bind("searchContainerHeight");
  padding-bottom: v-bind("paddingBottom");
  overflow: hidden;
  position: relative;
  @include searchContainer;
  .tree-select {
    :deep(.el-input__wrapper) {
      width: 280px !important;
    }
    :deep(.el-select__tags-text) {
      max-width: 58px !important;
    }
  }

  :deep .el-form-item--default {
    .el-form-item__label {
      height: 32px;
      line-height: 32px;
      min-width: v-bind('props.labelMinWidth+"px"');
    }
  }

  .expand {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    text-align: center;
    padding: 10px 0;
    color: grey;
    > span {
      cursor: pointer;
      font-size: 14px;
    }
    > i {
      cursor: pointer;
      vertical-align: middle;
    }
  }
}
</style>
<style lang="scss">
.tree-select-header {
  height: 0;
  border: none !important;
  .el-select-dropdown__header {
    height: 400px;
    padding: 0;
    border: none;
  }
  .el-select-dropdown__empty {
    display: none;
  }
}
</style>
