<template>
  <el-drawer v-model="drawerVisiable" :title="title" direction="rtl" header-class="custom-app-drawer-header"
    size="768px" destroy-on-close>
    <section v-scrollbar style="height: 100%">
      <el-form ref="ruleFormRef" class="form-container" :model="ruleForm" label-width="80px" label-position="right">
        <el-form-item label="分组名" prop="group" :rules="[
          { required: true, message: '请输入分组名', trigger: 'change' },
        ]">
          <el-input v-model="ruleForm.group" placeholder="请输入分组名" />
        </el-form-item>
        <el-form-item label="名称" prop="name" :rules="[
          { required: true, message: '请输入名称', trigger: 'change' },
        ]">
          <el-input v-model="ruleForm.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="父ID" prop="parentId">
          <el-tree-select v-model="ruleForm.parentId" check-strictly=true :data="tableData" filterable clearable />
        </el-form-item>
        <el-form-item label="code" prop="code">
          <el-input v-model="ruleForm.code" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="ruleForm.sort" controls-position="right" placeholder="请输入" />
          <el-tooltip class="box-item" effect="dark" content="数字越小，排序越靠前" placement="top">
            <el-icon class="iconfont icon-wenhao" size="16px" />
          </el-tooltip>
        </el-form-item>
        <el-form-item label="备注" prop="remark" class="exclusive-row">
          <el-input v-model="ruleForm.remark" type="textarea" :rows="4" placeholder="请输入描述" />
        </el-form-item>
      </el-form>
    </section>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="close">返回</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang='ts'>
import { ElMessage, type FormInstance } from "element-plus";
import { useDictTree } from "../hooks/useDictTree";
// import { addDic, updateDic } from "@/core/api/taskMgr";

const emits = defineEmits<{
  (e: "successCB"): void;
}>();
const { getTableList, tableData } = useDictTree();
const title = computed(() => (ruleForm.value?.id ? "编辑字典" : "新增字典"));
const drawerVisiable = ref(false);
const ruleFormRef = ref<FormInstance>();
const defaultForm = {
  id: null,
  group: '', name: '', parentId: '', code: '', sort: '', remark: '',
};
const ruleForm = ref({
  ...defaultForm,
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid, fields) => {
    if (valid) {
      // const handler = ruleForm.value.id ? updateDic : addDic;
      // const { code } = await handler({ ...ruleForm.value, parentId: ruleForm.value.parentId || 0 });
      // if (code == 200) {
      //   ElMessage.success("操作成功");
      //   close();
      //   emits("successCB");
      // }
    }
  });
};

const open = (row: any = {}, oper = 'edit') => {
  getTableList();
  if (oper == 'add') {
    ruleForm.value = { ...defaultForm };
  } else {
    ruleForm.value = Object.assign(row, { parentId: row.parentId == 0 ? null : row.parentId });
  }
  drawerVisiable.value = true;
};
const close = () => {
  drawerVisiable.value = false;
};
defineExpose({
  open,
  close,
});
</script>

<style scoped lang='scss'>
.form-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding-right: 40px;
  padding-bottom: 20px;

  .exclusive-row {
    grid-column: 1/3;
  }

  .icon-wenhao {
    margin-left: 8px;
    color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }
}
</style>
<style lang="scss">
.custom-app-drawer-header {
  margin-bottom: 10px !important;
  padding-bottom: 10px !important;
  padding-left: 20px !important;
  border-bottom: 1px solid #f2f2f2;
}
</style>