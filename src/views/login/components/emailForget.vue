<template>
  <div class="ForgotPassword">
    <div class="tips">我们将会发送一条重置密码的链接到您的邮箱，</div>
    <div class="form">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
        <el-form-item prop="email">
          <el-input
            v-model="ruleForm.email"
            type="text"
            clearable
            placeholder="请输入邮箱"
          >
          </el-input>
        </el-form-item>
        <el-button
          :loading="ruleForm.loading"
          type="primary"
          class="submit_btn pointer"
          @click="resetPwdSubmit(ruleFormRef)"
          >确定</el-button
        >
        <div class="back pointer">
          <span @click="backLogin">返回登录界面</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { useLoginEffect } from "../hooks/index";
import { useSendCode } from "../hooks/useSendCode";
import { emailRules } from "@/utils/rules";
import loginApi from "@/core/api/login";

const { usePicCode, useHooksState } = useLoginEffect();
const { useMsgCode, codeState } = useSendCode();

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  email: "", // 邮箱
  loading: false,

  status: "initial",
});
const rules = reactive({
  email: [
    {
      required: true,
      message: "请输入者邮箱",
      trigger: "blur",
    },
    {
      pattern: emailRules,
      message: "邮箱格式错误！",
      trigger: "blur",
    },
  ],
});

const getPicCode = async () => {
  await usePicCode();
};
const resetPwdSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  if (ruleForm.loading) {
    return;
  }
  formEl.validate(async (valid: any) => {
    if (!valid) return;
    const data = {
      email: ruleForm.email,
    } as any;
    ruleForm.loading = true;
    await loginApi
      .forgetPwdEmail(data)
      .then((res) => {
        ruleForm.loading = false;
        if (res.code == 200) {
          ElMessage.success("发送成功，请前往邮箱查看");
        }
      })
      .catch((err) => {
        ruleForm.loading = false;
      });
  });
};
const emits = defineEmits(["backLogin"]);
const backLogin = () => {
  emits("backLogin");
  // state.showForgetPwd = false;
};

onMounted(() => {
  getPicCode();
});
</script>

<style scoped lang="scss">
.ForgotPassword {
  box-sizing: border-box;
  width: 413px;
  border-radius: 24px;
  padding-top: 0;
  overflow: hidden;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.05);
  width: 414px;
  background: #ffffff;
  box-shadow: 0px 4px 8px 0px rgba(117, 117, 117, 0.2);
  border-radius: 12px;

  .top-bg {
    width: 100%;
    height: 5px;
    background: #216dd9;
  }

  .tabs {
    background-color: #f6f6f6;
    padding: 10px;
    margin-top: 15px;
    height: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    span {
      display: inline-block;
      text-align: center;
      width: 35%;
      height: 30px;
      cursor: pointer;
      line-height: 30px;
    }

    .active {
      color: #216dd9;
      background-color: #fff;
    }
  }

  .tips {
    padding-bottom: 10px;
    height: 40px;
    font-size: 14px;
    font-weight: 400;
    color: #000000;
    line-height: 20px;
  }

  .form {
    .login-code {
      display: flex;
      padding: 0 11px;
      justify-content: space-around;
      align-items: center;

      img {
        margin-left: 10px;
        width: 30%;
        height: 45px;
      }
    }

    .font-20 {
      font-size: 18px;
    }

    padding: 10px 20px 20px;
    text-align: center;

    .send-code {
      cursor: pointer;
      width: 100%;
      color: #216dd9;
    }

    &:deep(.el-input__wrapper) {
      border-right: none;
    }

    &:deep(.el-input-group__append) {
      background-color: #fff;
      border: none;
    }

    :deep(.el-form-item__content .el-input) {
      margin: 15px auto;
      width: 350px;
      height: 45px;
      line-height: 45px;
    }

    .back {
      margin-top: 20px;
      text-align: center;
      height: 22px;
      font-size: 16px;

      font-weight: 400;
      color: #216dd9;
      line-height: 22px;
    }
  }

  .submit_btn {
    margin-top: 20px;
    width: 80%;
    height: 40px;
    font-size: 14px;

    font-weight: 400;
    background: #156cee;
    border-radius: 4px;
  }
}
</style>
