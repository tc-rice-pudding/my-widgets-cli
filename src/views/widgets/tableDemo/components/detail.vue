<template>
  <div class="detail-view">
    <GlobalContentTitle />
    <header>
      <el-page-header :icon="ArrowLeft" @back="router.go(-1)">
        <template #content>
          <span class="text-large font-600 mr-3"> {{ OperEnum?.[queryParams?.oper] }} 配置</span>
        </template>
        <template #extra>
          <div class="flex items-center" v-if="queryParams?.oper != 'view'">
            <el-button @click="reset">重置</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
          </div>
        </template>
      </el-page-header>
    </header>
    <main v-scrollbar>
      <el-form ref="ruleFormRef" class="form-container" :model="ruleForm" label-width="100px" label-position="right"
        :disabled="queryParams?.oper == 'view'">
        <h4>基本信息</h4>
        <el-form-item label="厂商名称" prop="vendorId" :rules="[
          { required: true, message: '请选择厂商名称', trigger: 'change' },
        ]">
          <el-select-v2 v-model="ruleForm.vendorId" :options="vendorIdOps" placeholder="请选择厂商名称" />
        </el-form-item>
        <el-form-item label="根路径配置" prop="rootUrl" :rules="[
          { required: true, message: '请输入根路径配置', trigger: 'change' },
        ]">
          <el-input v-model="ruleForm.rootUrl" type="textarea" :rows="4" placeholder="请输入根路径配置" />
        </el-form-item>
        <el-form-item label="配置状态" prop="enable">
          <el-switch v-model="ruleForm.enable" :inactive-value="0" :active-value="1" />
        </el-form-item>

        <h4>配置信息</h4>
        <el-form-item label="注册用户地址配置" prop="registeredUserPath" label-width="180px">
          <el-input v-model="ruleForm.registeredUserPath" placeholder="注册用户地址配置" />
        </el-form-item>
        <el-form-item label="注册机构地址配置" prop="registeredOrgPath" label-width="220px">
          <el-input v-model="ruleForm.registeredOrgPath" placeholder="注册机构地址配置" />
        </el-form-item>
        <el-form-item label="全量同步用户信息地扯配置" prop="collectLogPath" label-width="180px">
          <el-input v-model="ruleForm.collectLogPath" placeholder="全量同步用户信息地扯配置" />
        </el-form-item>
        <el-form-item label="全量同步机构信息地址配置" prop="collectLogPath" label-width="220px">
          <el-input v-model="ruleForm.collectLogPath" placeholder="全量同步机构信息地址配置" />
        </el-form-item>
        <el-form-item label="是否全量同步用户" prop="enable" label-width="180px">
          <el-switch v-model="ruleForm.enable" :inactive-value="0" :active-value="1" />
        </el-form-item>
        <el-form-item label="是否全量同步用户同步机构" prop="enable" label-width="220px">
          <el-switch v-model="ruleForm.enable" :inactive-value="0" :active-value="1" />
        </el-form-item>
        <el-form-item label="是否增量同步用户" prop="enable" label-width="180px">
          <el-switch v-model="ruleForm.enable" :inactive-value="0" :active-value="1" />
        </el-form-item>
        <el-form-item label="是否增量同步用户同步机构" prop="enable" label-width="220px">
          <el-switch v-model="ruleForm.enable" :inactive-value="0" :active-value="1" />
        </el-form-item>
      </el-form>
    </main>
  </div>
</template>

<script setup lang='ts'>
import router from '@/router';
import { ArrowLeft } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance } from "element-plus";
import { useRoute } from 'vue-router';
// import { addConfig, getConfig, updateConfig } from '@/core/api/request';
import { useConfigDict } from '../hooks/useConfigDict';

const emits = defineEmits<{
  (e: "successCB"): void;
}>();

enum OperEnum {
  'add' = '新增',
  'edit' = '编辑',
  'view' = '查看',
}
const route = useRoute();
const { init, vendorIdOps, sendTypeOps, methodTypeOps } = useConfigDict();
const queryParams: any = route.query;
const ruleFormRef = ref<any>();
const defaultForm = {
  id: null,
  vendorId: "",
  rootUrl: "",
  enable: "",

  collectLogPath: "",
  auditSysId: "",
  sendMethod: "",
  sysLogIp: "",
  sysLogType: "",
  sysLogMaxLength: "",

  registeredUserPath: '',
  registeredOrgPath: '',
  allUserPath: '',
  allOrgPath: '',
  isPullAllUser: 0,
  isPullAllOrg: 0,
  isIncrementUser: 0,
  isIncrementOrg: 0,

  appPullPath: '',
  redPath: '',
  whitePath: '',
  appLevelPath: '',
  funcLevelPath: '',
  serverLevelPath: '',
  dataLevelPath: '',
};
const ruleForm = ref({
  ...defaultForm,
});

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid, fields) => {
    if (valid) {
      // const handler = ruleForm.value?.id ? updateConfig : addConfig;
      // const params: any = { ...ruleForm.value };
      // delete params.ext1;
      // delete params.ext2;
      // delete params.ext3;
      // const { code }: any = await handler(queryParams.type, params);
      // if (code == 200) {
      //   ElMessage.success("操作成功！");
      //   router.go(-1);
      // }
    }
  });
};

const getDetail = async () => {
  // const { data, code }: any = await getConfig(queryParams.type, { id: queryParams?.id });
  // ruleForm.value = data ?? {};
};

const reset = () => {
  ruleForm.value = { ...defaultForm };
};

watch(() => queryParams, async () => {
  init();
  if (queryParams?.id) {
    getDetail();
  } else {
    ruleForm.value = { ...defaultForm };
  }
}, { deep: true, immediate: true });
</script>

<style scoped lang='scss'>
.detail-view {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  :deep>header {
    height: 56px;
    background: #fff;
    padding: 12px 20px 12px 24px;
    border-radius: 4px 4px 0 0;
    border-bottom: 1px solid #D9D9D9;

    .el-page-header__back {
      font-weight: 400;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
    }

    .el-page-header__content {
      font-weight: 400;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.8);
    }
  }

  >main {
    height: calc(100% - 56px - 56px);
    width: 100%;
    padding: 24px 36px;
    background: #fff;
    border-radius: 0 0 4px 4px;

    h4 {
      font-weight: 500;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.8);
      width: 100%;
      grid-column: 1/3;
    }

    h4:not(:nth-of-type(1)) {
      border-top: 1px solid #F2F2F2;
      padding-top: 24px;
    }
  }
}

.form-container {
  display: grid;
  grid-template-columns: auto auto;
  gap: 20px;
  padding-right: 40px;
  padding-bottom: 20px;
  width: 60%;

  .el-form-item:nth-of-type(1),
  .el-form-item:nth-of-type(2),
  .el-form-item:nth-of-type(3) {
    grid-column: 1/3;
  }

  .el-input,
  .el-textarea,
  .el-select-v2 {
    max-width: 320px;
    width: 100%;
  }

  .exclusive-row {
    grid-column: 1/3;
  }
}
</style>