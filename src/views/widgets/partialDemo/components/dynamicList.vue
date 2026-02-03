<template>
  <div class="list-widget-view">
    <el-form v-if="formInfo.list.length > 0" ref="ruleFormRef" class="list-widget-form-container" :model="formInfo"
      label-width="auto" label-position="right">
      <section v-for="(item, inx) in formInfo.list" :key="inx">
        <el-form-item label="" :prop="`list[${inx}]`" :rules="formRules[props.reg]">
          <el-input v-model="formInfo.list[inx]" clearable />
        </el-form-item>
        <el-form-item label="">
          <el-button link text type="primary" @click="onAdd(inx)">
            <el-icon>
              <CirclePlus />
            </el-icon>
          </el-button>
          <el-button link text type="danger" @click="onDel(inx)">
            <el-icon>
              <Remove />
            </el-icon>
          </el-button>
        </el-form-item>
      </section>
    </el-form>
    <el-button v-else link text type="primary" @click="onAdd" style="margin: 10px 0px;">
      <el-icon>
        <CirclePlus />
      </el-icon>
    </el-button>
  </div>
</template>

<script setup lang='ts'>
const props = defineProps<{
  reg: 'email' | 'phone'
}>();
const ruleFormRef = ref();
const formInfo = reactive<any>({
  list: [],
});

const onAdd = (inx = formInfo.list.length) => {
  formInfo.list.splice(inx + 1, 0, '');
};
const onDel = (inx) => {
  formInfo.list.splice(inx, 1);
};

const formRules = ref({
  // 手机号校验
  phone: [
    // { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^1[3-9]\d{9}$/, // 手机号正则：以1开头，第二位3-9，后9位数字
      message: '请输入正确的11位手机号',
      trigger: 'blur'
    }
  ],
  // 邮箱校验
  email: [
    // { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, // 通用邮箱正则
      message: '请输入正确的邮箱格式',
      trigger: 'blur'
    }
  ]
});

const submitForm = () =>
  new Promise((resolve) => {
    ruleFormRef.value?.validate(async (valid, fields) => {
      if (valid) {
        resolve(formInfo.list.filter((it) => it)); // 过滤掉空字符串
      }
    });
  });

const setFormData = (list) => {
  formInfo.list = list;
};
defineExpose({ setFormData, submitForm });
</script>

<style scoped lang='scss'>
.list-widget-view {
  min-height: 60px;
  width: 100%;
  box-sizing: border-box;

  :deep .list-widget-form-container {
    >section {
      display: grid;
      grid-template-columns: 1fr 60px;
      column-gap: 20px;
      padding: 4px 0;
    }

    .el-form-item {
      border: unset !important;

      .el-form-item__label {
        background: #fff !important;
        border: unset !important;
      }

      .el-form-item__content {
        padding: 0 !important;

        .el-form-item__error {
          bottom: -10px;
          padding-left: 0;
        }
      }
    }

    .el-form-item:last-of-type {
      .el-form-item__content {
        gap: 0 !important;
      }
    }
  }
}
</style>