<template>
  <div class="dynamic-condition-view">
    <el-form ref="ruleFormRef" class="form-container" :model="formInfo" label-width="80px" label-position="right"
      scroll-to-error>
      <el-form-item label="生成方式" prop="showType">
        <el-radio-group v-model="formInfo.showType">
          <el-radio :value="1">上传json串</el-radio>
          <el-radio :value="2">条件输入</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="formInfo.showType == 1" prop="conditions">
        <el-input v-model="formInfo.conditionsStr" type="textarea" :autosize="{ minRows: 5, maxRows: 20 }"
          placeholder="请输入json" class="my-code" />
      </el-form-item>
      <el-form-item v-show="formInfo.showType == 2" prop="conditions" style="padding: 0;">
        <Condition name="过滤条件" :isSlot="true" @result="(val) => {
          formInfo.conditions = val;
          formInfo.conditionsStr = JSON.stringify(val ?? {});
        }">
          <template #default="item">
            <div class="slot-container" :key="item.index">
              <el-input v-model="item.element.alias" />
            </div>
          </template>
        </Condition>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang='ts'>
import Condition from '@/views/dynamicCondition/index.vue';
const formInfo = reactive({
  showType: 1,
  conditionsStr: '',
  conditions: {},
});
</script>

<style scoped lang='scss'>
.dynamic-condition-view {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
</style>