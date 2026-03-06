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
        <Condition ref="conditionerRef" name="过滤条件" @result="(val) => {
          formInfo.conditions = val;
          formInfo.conditionsStr = JSON.stringify(val ?? {});
        }" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang='ts'>
import Condition from '@/views/dynamicCondition/index.vue';

const groupCondition = ref<any[]>([
  {
    "id": 35,
    "logicDel": 0,
    "createBy": "dev",
    "updateBy": "dev",
    "createTime": "2026-02-26 15:50:44",
    "updateTime": "2026-02-26 15:50:44",
    "sourceId": 2,
    "itemName": "nodeId",
    "itemNameZh": "节点ID",
    "analyzeType": "alert",
    "itemType": "string",
    "itemDesc": "节点ID",
    "itemFormat": null,
    "itemLength": 256,
    "isNullable": 0,
    "dict": null,
    "extOpts": null,
    "status": 1,
    "label": "节点ID",
    "value": "nodeId"
  },
  {
    "id": 39,
    "logicDel": 0,
    "createBy": "dev",
    "updateBy": "dev",
    "createTime": "2026-02-26 15:50:44",
    "updateTime": "2026-02-26 15:50:44",
    "sourceId": 2,
    "itemName": "nodePort",
    "itemNameZh": "端口",
    "analyzeType": "alert",
    "itemType": "integer",
    "itemDesc": "端口",
    "itemFormat": null,
    "itemLength": 4,
    "isNullable": 0,
    "dict": null,
    "extOpts": null,
    "status": 1,
    "label": "端口",
    "value": "nodePort"
  },
  {
    "id": 41,
    "logicDel": 0,
    "createBy": "dev",
    "updateBy": "dev",
    "createTime": "2026-02-26 15:50:44",
    "updateTime": "2026-02-26 15:50:44",
    "sourceId": 2,
    "itemName": "released",
    "itemNameZh": "已发布",
    "analyzeType": "alert",
    "itemType": "integer",
    "itemDesc": "已发布：0-否，1-是",
    "itemFormat": null,
    "itemLength": 1,
    "isNullable": 0,
    "dict": "data_res_yes_or_no",
    "extOpts": null,
    "status": 1,
    "dicts": [
      {
        "id": 285,
        "parentId": 0,
        "code": "0",
        "name": "否",
        "remark": "",
        "sort": 1
      },
      {
        "id": 290,
        "parentId": 0,
        "code": "1",
        "name": "是",
        "remark": "",
        "sort": 2
      }
    ],
    "label": "已发布",
    "value": "released"
  },
  {
    "id": 42,
    "logicDel": 0,
    "createBy": "dev",
    "updateBy": "dev",
    "createTime": "2026-02-26 15:50:44",
    "updateTime": "2026-02-26 15:50:44",
    "sourceId": 2,
    "itemName": "heartbeatTime",
    "itemNameZh": "心跳时间",
    "analyzeType": "alert",
    "itemType": "datetime",
    "itemDesc": "心跳时间",
    "itemFormat": null,
    "itemLength": null,
    "isNullable": 1,
    "dict": null,
    "extOpts": null,
    "status": 1,
    "label": "心跳时间",
    "value": "heartbeatTime"
  },
]);
provide("groupCondition", groupCondition);

const conditionerRef = ref();
const formInfo = reactive({
  showType: 1,
  conditionsStr: '',
  conditions: {},
});

onMounted(() => {
  conditionerRef.value?.initConditions({ "logical": "AND", "items": [{ "fieldType": "integer", "value": [1], "field": "nodePort", "dicts": [], "relation": "EQUALS" }, { "fieldType": "dict", "value": ["1"], "field": "released", "dicts": [{ "id": 285, "parentId": 0, "code": "0", "name": "否", "remark": "", "sort": 1 }, { "id": 290, "parentId": 0, "code": "1", "name": "是", "remark": "", "sort": 2 }], "relation": "EQUALS" }] });
});
</script>

<style scoped lang='scss'>
.dynamic-condition-view {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
</style>