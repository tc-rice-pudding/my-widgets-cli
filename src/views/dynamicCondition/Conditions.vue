<template>
  <div class="condition-wrapper" :style="{ height: state.collapsed ? '75px' : 'auto' }">
    <div class="left">
      <div v-if="state.conditions.items.length > 1" class="collapsed-btn">
        <el-button v-if="state.collapsed" type="primary" :icon="ArrowUp" circle @click="handleCollapsed" />
        <el-button v-else type="primary" :icon="ArrowDown" circle @click="handleCollapsed" />
      </div>
      <el-dropdown placement="bottom-end" @command="handleCommand">
        <el-button type="primary" plain>{{ conjunctionMap[state.conditions.logical] }}</el-button>
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
      <ConditionItem v-if="state.editMode" v-bind="$attrs" :conditions="state.conditions.items" :top="true"
        @remove="removeCondition">
        <template #default="item">
          <slot v-bind="item" />
        </template>
      </ConditionItem>
      <!-- 展开全部 -->
      <el-divider v-if="state.collapsed" class="unfold" @click="handleCollapsed">
        展开全部<el-icon>
          <ArrowDown />
        </el-icon>
      </el-divider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import ConditionItem from './ConditionItem.vue'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'

const emits = defineEmits(['result'])
const state: any = reactive({
  conditions: {
    id: Date.now(),
    logical: 'AND',
    items: []
  },
  collapsed: false,
  editMode: false
})

const conjunctionMap: any = {
  AND: '且',
  OR: '或',
  NOT: '非'
}
const handleCommand = (command: string) => {
  state.conditions.logical = command
}

const handleCollapsed = () => {
  state.collapsed = !state.collapsed
}

const removeCondition = (index: any) => {
  state.conditions.items.splice(index, 1)
}

watch(() => state, (newValue, oldValue) => {
  emits('result', state)
}, { deep: true })

/**
 * 初始化条件
 * @param val 
 */
const handleInit = (val) => {
  state.editMode = false
  state.conditions = val
  nextTick(() => {
    state.editMode = true
  })
}

onMounted(() => {
  state.editMode = true
})

onBeforeUnmount(() => {
});

defineExpose({
  state,
  initConditions: handleInit,
})
</script>

<style scoped lang="scss">
.condition-wrapper {
  display: flex;
  gap: 10px;
  align-items: stretch;
  overflow: hidden;
  background-color: #fff;
  padding: 10px 0;

  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    .collapsed-btn {
      position: absolute;
      top: -10px;
      left: 0;
      transform: scale(0.7);
    }

    &::before {
      content: " ";
      position: absolute;
      top: .3125rem;
      bottom: .3125rem;
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
    position: relative;

    .unfold {
      position: absolute;
      top: 32px;
      cursor: pointer;
    }
  }
}

.out {
  text-indent: -2.3em;
}
</style>
