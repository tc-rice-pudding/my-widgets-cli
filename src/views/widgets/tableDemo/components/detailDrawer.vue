<template>
  <el-drawer
    v-model="drawerVisiable"
    :title="title"
    direction="rtl"
    header-class="custom-app-drawer-header"
    size="768px"
    destroy-on-close
  >
    <section v-scrollbar style="height: 100%">
      <el-form
        ref="ruleFormRef"
        class="form-container"
        :model="ruleForm"
        label-width="80px"
        label-position="right"
      >
        <el-form-item
          label="参数名"
          prop="varName"
          :rules="[
            { required: true, message: '请输入参数名', trigger: 'change' },
          ]"
        >
          <el-input v-model="ruleForm.varName" placeholder="请输入参数名" />
        </el-form-item>
        <el-form-item
          label="名称"
          prop="zhName"
          :rules="[
            { required: true, message: '请输入名称', trigger: 'change' },
          ]"
        >
          <el-input v-model="ruleForm.zhName" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="值" prop="value" class="exclusive-row">
          <el-input
            v-model="ruleForm.value"
            type="textarea"
            :rows="4"
            placeholder="请输入值"
          />
        </el-form-item>
        <el-form-item label="描述" prop="desc" class="exclusive-row">
          <el-input
            v-model="ruleForm.desc"
            type="textarea"
            :rows="4"
            placeholder="请输入描述"
          />
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-switch
            v-model="ruleForm.status"
            :inactive-value="0"
            :active-value="1"
          />
        </el-form-item>
      </el-form>
    </section>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="close">返回</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >保存</el-button
        >
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang='ts'>
import { ElMessage, type FormInstance } from "element-plus";

const emits = defineEmits<{
  (e: "successCB"): void;
}>();
const title = computed(() => (ruleForm.value?.id ? "编辑参数" : "新增参数"));
const drawerVisiable = ref(false);
const ruleFormRef = ref<FormInstance>();
const defaultForm = {
  id: null,
  status: "",
  desc: "",
  value: "",
  varName: "",
  zhName: "",
};
const ruleForm = ref({
  ...defaultForm,
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid, fields) => {
    if (valid) {
      // const { code } = await updateSysConfig(ruleForm.value);
      // if (code == 200) {
      //   ElMessage.success("操作成功！");
      //   close();
      //   emits("successCB");
      // }
    }
  });
};

const open = (row: any = {}) => {
  if (row.id) {
    ruleForm.value = row;
  } else {
    ruleForm.value = { ...defaultForm };
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
}
</style>
<style lang="scss">
.custom-app-drawer-header {
  margin-bottom: 10px !important;
  padding-bottom: 10px !important;
  border-bottom: 1px solid #f2f2f2;
}
</style>