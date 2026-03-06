<template>
  <draggable tag="ul" :list="state.conditions" :group="{ name: 'g1' }" item-key="id">
    <template #item="{ element, index }">
      <li class="condition-item">
        <!-- items 字条件组 -->
        <div v-if="!element.items">
          <div class="item-wrapper">
            <DragHandle />

            <slot v-bind="{ element, index }" />

            <!-- FIXME: 类型 -->
            <el-select v-if="!props.isSlot" v-model="element.field" placeholder="请选择" style="width: 200px"
              @change="(val) => handleMetricChange(val, element)">
              <el-option v-for="m in groupCondition" :key="m.value" :label="m.label" :value="m.value" />
            </el-select>

            <!-- FIXME: 操作符 -->
            <el-select v-model="element.relation" placeholder="请选择" style="width: 100px; margin: 0 20px">
              <el-option v-for="o in conditionList" :key="o.value" :label="o.label" :value="o.value" />
            </el-select>

            <div v-if="!['IS_NULL', 'NOT_NULL', 'EMPTY', 'NOT_EMPTY'].includes(element.relation)" style="flex: 1">
              <!-- FIXME: 字典类型 -->
              <span v-if="['dict'].includes(element.fieldType)">
                <template v-if="['BETWEEN', 'BETWEEN_START', 'BETWEEN_END', 'BETWEEN_BOTH'].includes(element.relation)">
                  <el-select class="item-select" v-model="element.value[0]" placeholder="请选择" style="max-width: 200px;"
                    clearable>
                    <el-option v-for="o in element.dicts" :key="o.code" :label="o.name" :value="o.code" />
                  </el-select>
                  <span style="margin: 0 20px">~</span>
                  <el-select class="item-select" v-model="element.value[1]" placeholder="请选择" style="width: 200px"
                    clearable>
                    <el-option v-for="o in element.dicts" :key="o.code" :label="o.name" :value="o.code" />
                  </el-select>
                </template>
                <template v-else-if="element.relation === 'IN'">
                  <el-select class="item-select" v-model="element.value" placeholder="请选择" style="width: 200px" multiple
                    collapse-tags collapse-tags-tooltip clearable>
                    <el-option v-for="o in element.dicts" :key="o.code" :label="o.name" :value="o.code" />
                  </el-select>
                </template>
                <template v-else>
                  <el-select class="item-select" v-model="element.value[0]" placeholder="请选择" style="width: 200px"
                    clearable>
                    <el-option v-for="o in element.dicts" :key="o.code" :label="o.name" :value="o.code" />
                  </el-select>
                </template>
              </span>
              <!-- FIXME: 数字 -->
              <span v-else-if="['integer'].includes(element.fieldType)">
                <template v-if="['BETWEEN', 'BETWEEN_START', 'BETWEEN_END', 'BETWEEN_BOTH'].includes(element.relation)">
                  <el-input-number v-model="element.value[0]" :precision="2" :min="0" :max="element.value[1]"
                    controls-position="right" />
                  <span style="margin: 0 20px" >~</span>
                  <el-input-number v-model="element.value[1]" :precision="2" :min="element.value[0]"
                    controls-position="right" />
                </template>
                <template v-else-if="element.relation === 'IN'">
                  <el-input-tag class="input-tag" v-model="element.value" placeholder="请输入" style="width: 200px" />
                </template>
                <template v-else>
                  <el-input-number v-model="element.value[0]" :precision="2" :min="0" controls-position="right" />
                </template>
              </span>

              <!-- FIXME: 字符串 -->
              <span v-if="['string'].includes(element.fieldType)">
                <template v-if="['BETWEEN', 'BETWEEN_START', 'BETWEEN_END', 'BETWEEN_BOTH'].includes(element.relation)">
                  <el-input v-model="element.value[0]" placeholder="请输入" style="width: 200px;" />
                  <span style="margin: 0 20px">~</span>
                  <el-input v-model="element.value[1]" placeholder="请输入" style="width: 200px;" />
                </template>
                <template v-else-if="element.relation === 'IN'">
                  <el-input-tag class="input-tag" v-model="element.value" placeholder="请输入" />
                </template>
                <template v-else>
                  <el-input v-model="element.value[0]" placeholder="请输入" style="width: 200px;" />
                </template>
              </span>

              <!-- FIXME: 时间 -->
              <span v-if="['datetime'].includes(element.fieldType)">
                <template v-if="['BETWEEN', 'BETWEEN_START', 'BETWEEN_END', 'BETWEEN_BOTH'].includes(element.relation)">
                  <el-date-picker v-model="element.value" type="datetimerange" start-placeholder="开始时间"
                    end-placeholder="结束时间" value-format="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm:ss" />
                </template>
                <template v-else-if="element.relation === 'IN'">
                  <el-input-tag class="input-tag" v-model="element.value" placeholder="请输入" />
                </template>
                <template v-else>
                  <el-date-picker v-model="element.value[0]" clearable type="datetime" range-separator="至"
                    start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD HH:mm:ss"
                    popper-class="my-date" />
                </template>
              </span>
            </div>

            <el-icon color="#84878c" @click="removeCondition(index)" class="remove-btn">
              <Delete />
            </el-icon>
          </div>
        </div>

        <div v-if="element.items && element.items.length" class="children">
          <div class="condition-wrapper" :style="{ height: state.collapsed ? '75px' : 'auto' }">
            <div class="left">
              <div v-if="element.items.length > 1" class="collapsed-btn">
                <el-button v-if="state.collapsed" type="primary" :icon="ArrowUp" circle @click="handleCollapsed" />
                <el-button v-else type="primary" :icon="ArrowDown" circle @click="handleCollapsed" />
              </div>
              <el-dropdown placement="bottom-end" @command="(val: string) => handleCommand(val, element)">
                <el-button type="primary" plain>{{
                  conjunctionMap[element.logical]
                }}</el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="AND">且</el-dropdown-item>
                    <el-dropdown-item command="OR">或</el-dropdown-item>
                    <el-dropdown-item command="NOT">非</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div class="right">
              <ConditionItem :conditions="element.items" :pi="index" @remove="removeCondition" :isSlot="props.isSlot">
                <template #default="item">
                  <slot v-bind="item" />
                </template>
              </ConditionItem>

              <el-divider v-if="state.collapsed" class="unfold" @click="handleCollapsed">
                展开全部<el-icon>
                  <ArrowDown />
                </el-icon>
              </el-divider>
            </div>
          </div>
        </div>
      </li>
    </template>
  </draggable>

  <div v-if="top" class="tool">
    <el-button type="primary" link @click="addCondition">添加条件</el-button>
    <el-button type="primary" link @click="addConditionGroup">添加条件组</el-button>
  </div>

  <div v-if="!top && state.conditions" class="tool">
    <el-button type="primary" link @click="addCondition">添加条件</el-button>
    <el-button type="primary" link @click="addConditionGroup">添加条件组</el-button>
    <el-button type="primary" link @click="removeConditionGroup">删除组</el-button>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { ArrowDown, ArrowUp, Delete } from "@element-plus/icons-vue";
import draggable from "vuedraggable";
import DragHandle from "./DragHandle.vue";

const conditionList = [
  { label: '等于', value: 'EQUALS' },
  { label: '不等于', value: 'NOT_EQUALS' },
  { label: '大于', value: 'GREATER_THAN' },
  { label: '大于等于', value: 'GREATER_THAN_EQUAL' },
  { label: '小于', value: 'LESS_THAN' },
  { label: '小于等于', value: 'LESS_THAN_EQUAL' },
  { label: '在范围内', value: 'IN' }, // 后方可填多值
  { label: '值为 null', value: 'IS_NULL' }, // 后方不可填值 
  { label: '值不为 null', value: 'NOT_NULL' }, // 后方不可填值
  { label: '值为空', value: 'EMPTY' }, // 后方不可填值
  { label: '值不为空', value: 'NOT_EMPTY' }, // 后方不可填值
  { label: '作为前缀', value: 'PREFIX' },
  { label: '作为后缀', value: 'SUFFIX' },
  { label: '包含', value: 'LIKE' },
  { label: '范围开区间', value: 'BETWEEN' },
  { label: '范围左闭右开', value: 'BETWEEN_START' },
  { label: '范围左开右闭', value: 'BETWEEN_END' },
  { label: '范围闭区间', value: 'BETWEEN_BOTH' },
];

const props = defineProps({
  conditions: {
    type: Array,
  },
  top: {
    type: Boolean,
  },
  pi: {
    type: Number,
  },
  isSlot: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["remove"]);

const state: any = reactive({
  collapsed: false,
});

const generateRandomString = (length: number) => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

const addCondition = (item: any) => {
  if (!state.conditions) state.conditions = [];
  state.conditions.push({
    id: generateRandomString(12),
    fieldType: 'string',
    value: [],
  });
};
const removeCondition = (index: any) => {
  state.conditions.splice(index, 1);
  if (state.conditions.length == 0) {
    removeConditionGroup();
  }
};

const addConditionGroup = () => {
  if (!state.conditions) state.conditions = [];
  state.conditions.push({
    id: generateRandomString(12),
    logical: "AND",
    items: [
      {
        id: generateRandomString(12),
        fieldType: 'string',
        value: [],
      },
    ],
  });
};
const removeConditionGroup = () => {
  emits("remove", props.pi);
};

const handleCommand = (command: any, item: any) => {
  item.logical = command;
};

const handleCollapsed = () => {
  state.collapsed = !state.collapsed;
};

const handleMetricChange = async (val, item: any) => {
  // item.conditionValues = [];
  const target = groupCondition.value.find((item) => item.value == val);
  if (target) {
    item.fieldType = target.dicts?.length ? 'dict' : target.itemType;
    item.dicts = target.dicts || [];
    item.value = Array.isArray(item.value) ? item.value : [];
  }
};

const groupCondition: any = inject("groupCondition");
const conjunctionMap: any = {
  AND: "且",
  OR: "或",
  NOT: '非'
};

onMounted(async () => {
  state.conditions = props.conditions;
});
</script>

<style scoped lang="scss">
.condition-item {
  min-height: 30px;
  position: relative;

  &:not(:first-of-type) {
    margin-top: 10px;
  }

  .remove-btn {
    position: absolute;
    right: 20px;
    top: 18px;
    z-index: 10;
    cursor: pointer;
  }

  .children {
    margin-left: 20px;
    position: relative;
  }

  .item-wrapper {
    background-color: #f7f8fa;
    padding: 10px 60px 10px 30px;
    position: relative;
    display: flex;
    align-items: center;

    .input-tag {
      padding: 0 6px;

      :deep(.el-tag__close) {
        margin-top: 2px;
      }
    }
  }
}

.condition-wrapper {
  display: flex;
  gap: 20px;
  align-items: stretch;
  overflow: hidden;

  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    .collapsed-btn {
      position: absolute;
      top: 0;
      left: 0;
      transform: scale(0.7);
    }

    &::before {
      content: " ";
      position: absolute;
      top: 0.3125rem;
      bottom: 0.3125rem;
      left: 15px;
      width: 2px;
      background-color: #528eff;
    }

    ::v-deep(.el-dropdown .el-button) {
      width: 30px;
      transform: scale(0.8);
    }
  }

  .right {
    width: 100%;

    .unfold {
      position: absolute;
      top: 35px;
      cursor: pointer;
    }
  }
}
</style>

<style lang="scss">
.my-date .el-time-panel {
  width: 155px !important;
}
</style>
