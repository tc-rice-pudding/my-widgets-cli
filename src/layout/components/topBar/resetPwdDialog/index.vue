<template>
  <el-dialog
    :model-value="dialogVisible"
    width="550px"
    :append-to-body="true"
    :close-on-click-modal="false"
    :modal="true"
    title="修改密码"
    @close="hideDialog"
  >
    <div class="dialog-form-item">
      <el-form
        ref="formRef"
        :model="state.editFormValues"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item prop="password" label="当前密码">
          <el-input
            class="form-ipt"
            v-model="state.editFormValues.password"
            type="password"
            placeholder="请输入当前密码"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="新的密码"
          prop="newPassword"
          style="display: flex; flex-wrap: nowrap"
        >
          <el-input
            class="form-ipt"
            v-model="state.editFormValues.newPassword"
            show-password
            placeholder="请输入8-14位，大小写字母、数字、符号"
          />
          <el-button
            type="primary"
            class="create-pwd-btn"
            link
            @click="createPwd()"
          >
            随机生成
          </el-button>
        </el-form-item>
        <!-- <el-form-item label="">
          <el-button
            type="primary"
            class="create-pwd-btn"
            link
            @click="createPwd()"
          >
            随机生成
          </el-button>
        </el-form-item> -->
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            class="form-ipt"
            v-model="state.editFormValues.confirmPassword"
            show-password
            placeholder="请输入8-14位，大小写字母、数字、符号"
          />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          color="#216DD9"
          @click="confirmDialog(formRef)"
          >确定</el-button
        >
        <el-button @click="hideDialog">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import loginApi from "@/core/api/login";
import type { FormInstance } from "element-plus";
import { Encrypt, Decrypt, sm2Decrypt } from "@/utils/encrypt";
import { ElMessage } from "element-plus";
import { generatePassword } from "@/utils/common";
import type { FormRules } from "element-plus";
import { checkPwd } from "@/utils/validate";
interface FormValue {
  password: string;
}
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    require: true,
    default: true,
  },
});
const passwordRepeat = (rule: any, value: any, callback: any) => {
  let reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,14}$/;
  if (!reg.test(value)) {
    return callback(
      new Error("8-14位， 字母、数字、特殊字符 2种或两种以上组合")
    );
  }
  if (value !== state.editFormValues.newPassword) {
    return callback(new Error("两次输入密码不一致"));
  }
  return callback();
};

const rules = reactive<FormRules>({
  password: [{ required: true, trigger: "change", message: "请输入原始密码" }],
  newPassword: [{ required: true, trigger: "change", validator: checkPwd }],
  confirmPassword: [
    { required: true, trigger: "change", validator: passwordRepeat },
  ],
});

const state = reactive({
  editFormValues: {
    password: "",
    newPassword: "",
    confirmPassword: "",
  },
  editLoading: false,
}) as any;
const formRef = ref<FormInstance>();
const emit = defineEmits(["submit", "close"]);

const hideDialog = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
  emit("close");
};
const confirmDialog = async (formEle: FormInstance | undefined) => {
  if (!formEle) {
    return;
  }
  await formEle.validate((valid) => {
    if (valid) {
      updatePwd();
    }
  });
};
//随机生成密码
const createPwd = () => {
  state.editFormValues.newPassword = generatePassword(
    true,
    true,
    true,
    true,
    8
  );
  state.editFormValues.confirmPassword = state.editFormValues.newPassword;
  // state.editFormValues.confirmPassword = generatePassword(
  //   true,
  //   true,
  //   true,
  //   true,
  //   8
  // );

  console.log("pwd", state.editFormValues.password);

  // loginApi.resetPwd().then((res) => {
  //   state.editFormValues.password = res.data && res.data.randomPassword;
  // });
};
const updatePwd = () => {
  state.editLoading = false;
  const password = Encrypt(state.editFormValues.password);
  const newPassword = Encrypt(state.editFormValues.newPassword);
  const confirmPassword = Encrypt(state.editFormValues.confirmPassword);

  const params = {
    password,
    newPassword,
    confirmPassword,
  } as FormValue;

  loginApi
    .resetPwd(params)
    .then((res) => {
      state.editLoading = true;
      ElMessage.success("修改密码成功");
      emit("submit");
    })
    .catch(() => {
      state.editLoading = false;
      // state.editFormValues.password = Decrypt(state.editFormValues.password);
      state.editFormValues.password = Decrypt(state.editFormValues.password);
      state.editFormValues.confirmPassword = Decrypt(
        state.editFormValues.confirmPassword
      );
    });
};

onMounted(() => {
  // const pwd = generatePassword(true, true, true, true, 8);
  // console.log("pwd", pwd);
});
</script>
<style scoped lang="scss">
:deep(.el-input__inner) {
  width: 230px;
}

.dialog-form-item {
  p {
    font-size: 16px;
    //
    font-weight: 500;
    padding: 10px 0 10px 22px;
  }
  .form-ipt {
    width: 288px;
  }
}

.dialog-form-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;

  :deep(.el-form) {
    margin: 0 auto;
    margin-left: 0;
  }

  :deep(.el-input__wrapper) {
    width: 288px;
  }

  :deep(.el-input__inner) {
    width: 288px;
  }

  .el-form-item {
    min-width: 230px;
    line-height: 35px;
    margin: 0 auto 15px auto;
  }

  .create-pwd-btn {
    // margin-top: 14px;
    display: inline-block;
    margin-left: 30px;
  }
}
</style>
