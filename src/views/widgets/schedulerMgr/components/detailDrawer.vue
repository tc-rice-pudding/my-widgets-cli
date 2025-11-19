<template>
  <el-drawer
    v-if="drawerVisiable"
    v-model="drawerVisiable"
    :title="title"
    direction="rtl"
    header-class="custom-app-drawer-header"
    size="940px"
  >
    <h2>调度器信息</h2>
    <el-form
      ref="ruleFormRef"
      class="form-container"
      :model="ruleForm"
      label-width="140px"
    >
      <el-form-item
        label="调度器名称"
        prop="scheduleName"
        :rules="[
          { required: true, message: '请输入调度器名称', trigger: 'change' },
        ]"
      >
        <el-input
          v-model="ruleForm.scheduleName"
          placeholder="请输入调度器名称"
        />
      </el-form-item>
      <el-form-item label="调度策略类型" prop="scheduleType">
        <el-radio-group v-model="ruleForm.scheduleType" @change="onChange" :disabled="isDisabled">
          <el-radio
            v-for="(value, key) in scheduleTypeMap"
            :key="key"
            :value="key"
            >{{ value }}</el-radio
          >
        </el-radio-group>
      </el-form-item>

      <!-- 固定速度 -->
      <fixed-speed
        v-if="scheduleTypeMap[ruleForm.scheduleType] == '固定速度'"
        v-model:formInfo="ruleForm"
      />
      <!-- CRON -->
      <cron
        v-if="scheduleTypeMap[ruleForm.scheduleType] == 'CRON'"
        v-model:formInfo="ruleForm"
      />
      <!-- 单次 -->
      <once
        v-if="scheduleTypeMap[ruleForm.scheduleType] == '单次'"
        v-model:formInfo="ruleForm"
      />

      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="ruleForm.remark"
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
        />
      </el-form-item>
    </el-form>
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
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { useDict } from "../hooks/useDict";
import FixedSpeed from "../widgets/fixedSpeed.vue";
import Cron from "../widgets/cron.vue";
import Once from "../widgets/once.vue";
// import { addSchedule, updateSchedule } from "@/core/api/schedulerMgr";
import { useCronDisabled } from "../hooks/useCronDisabled";

const emits = defineEmits<{
  (e: "successCB"): void;
}>();
const { scheduleTypeMap, cronTypeMap, periodMap, initDict } = useDict();
const {isDisabled, setCronOperStatus} =useCronDisabled();
const title = computed(() => (ruleForm?.id ? "编辑调度器" : "新增调度器"));
const drawerVisiable = ref(false);
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<any>({
  id: null,
  scheduleName: "",
  expression: 1,
  scheduleType: "",
  period: "",
  remark: "",
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid, fields) => {
    if (valid) {
      // const handlerFn = ruleForm?.id ? updateSchedule : addSchedule;
      // const { code } = await handlerFn({
      //   ...ruleForm,
      //   expression: Array.isArray(ruleForm.expression)?ruleForm.expression.join(' '):ruleForm.expression,
      //   cronType: +ruleForm.cronType,
      // });
      // if (code == 200) {
      //   ElMessage.success("添加成功！");
      //   close();
      //   emits("successCB");
      // }
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

onBeforeUnmount(() => {
  resetForm(ruleFormRef.value);
});

const open = (row = {} as any) => {
  Object.assign(ruleForm, {
    id: row.id ?? null,
    jobNum: row.jobNum??0,
    scheduleName: row.scheduleName ?? "",
    expression: cronTypeMap.value[row.cronType]=="高级设置"?row.expression.split(' '):row.expression ?? "",
    cronType: (row.cronType ?? "") + "",
    scheduleType: (row.scheduleType ?? "") + "",
    period: row.period ?? "",
    remark: row.remark ?? "",
    __interval: "",
  });
  setCronOperStatus(ruleForm.jobNum>0);
  drawerVisiable.value = true;

  console.log(ruleForm);

  setTimeout(() => {
    ruleFormRef.value?.clearValidate(["scheduleName"]);
  }, 100);
};

const onChange = () => {
  ruleForm.period = "";
  ruleForm.expression = "";

  // 固定速度->初始化
  if (
    scheduleTypeMap.value[ruleForm.scheduleType] == "固定速度" &&
    ruleForm.expression == ""
  ) {
    ruleForm.expression = 1;
  }
};

const close = () => {
  Object.assign(ruleForm, {
    id: null,
    scheduleName: "",
    expression: "",
    scheduleType: "",
    period: "",
    remark: "",
  });
  drawerVisiable.value = false;
};
defineExpose({
  open,
  close,
});
</script>

<style scoped lang='scss'>
h2 {
  font-weight: 500;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 20px;
  padding-left: 30px;
}
.form-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding-left: 30px;
  padding-right: 40px;

  :deep .el-form-item {
    .el-radio-group {
      column-gap: 24px;
    }
  }
}
</style>
<style lang="scss">
.custom-app-drawer-header {
  margin-bottom: 10px !important;
  padding-left: 20px !important;
  padding-bottom: 10px !important;
  border-bottom: 1px solid #f2f2f2;
}
</style>