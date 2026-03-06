<template>
  <el-popover title="" placement="bottom-start" :width="320" :visible="state.searchVisible">
    <template #reference>
      <el-button class="registerBtn" size="small" @click="state.searchVisible = !state.searchVisible" plain>筛选
        <el-icon style="margin-left: 8px;">
          <Filter />
        </el-icon>
      </el-button>
    </template>
    <el-form :model="state.searchForm" label-width="auto" label-position="top" v-click-outside:registerBtn="() => {
      state.searchVisible = false;
    }">
      <el-form-item label="审核状态">
        <el-checkbox-group v-model="state.searchForm.operateTypeList">
          <el-checkbox :value="1" label="发布" />
          <el-checkbox :value="2" label="更新" />
          <el-checkbox :value="3" label="下线" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="开发者">
        <el-select v-model="state.searchForm.serviceOwnerList" placeholder="全部" multiple collapse-tags
          collapse-tags-tooltip clearable>
          <el-option v-for="item in [
            { label: '张三', value: '1' },
            { label: '李四', value: '2' },
          ]" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <div class="btn-container">
        <el-button @click="onReset">重置</el-button>
        <el-button type="primary" plain @click="onSearch">确定</el-button>
      </div>
    </el-form>
  </el-popover>
</template>

<script setup lang='ts'>
const state = reactive({
  searchVisible: false,
  searchForm: {
    operateTypeList: [],
    serviceOwnerList: [],
  },
});

const onReset = () => {
  state.searchVisible = false;
};
const onSearch = () => {
  state.searchVisible = false;
};
</script>

<style scoped lang='scss'></style>