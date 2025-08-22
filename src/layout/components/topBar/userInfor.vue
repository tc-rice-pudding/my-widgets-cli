<template>
  <el-dropdown trigger="click">
    <Avatars style="font-size: 20px;" />

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="editPwd">修改密码</el-dropdown-item>
        <el-dropdown-item @click="switchApp">切换应用</el-dropdown-item>
        <el-dropdown-item @click="exit">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- <resetPwd :dialogVisible="state.dialogVisible" /> -->
  <ResetPwdDialog :dialogVisible="state.dialogPwdVisible" @submit="submitPwd" @close="closePwd" />
</template>
<script lang="ts" setup>
import { ElMessageBox } from "element-plus";
import { authorized } from "@/config/env/checkEnv";
import { loginOut } from "@/core/api/app";
import { useApp } from "@/pinia/modules/app";
import { useRouter } from "vue-router";
import ResetPwdDialog from "./resetPwdDialog/index.vue";
const router = useRouter();
const state = reactive({
  dialogPwdVisible: false,
});
const submitPwd = () => {
  state.dialogPwdVisible = false;
  useApp().clearToken();
  router.push("/login");
};
const closePwd = () => {
  state.dialogPwdVisible = false;
};
// 退出
const exit = () => {
  ElMessageBox.confirm("退出系统，是否继续？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      // await loginOut();
      // 清除token
      useApp().clearToken();
      router.push("/login");
      // authorized(import.meta.env.MODE);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });
};
const switchApp = () => {
  router.push("/appList");
};
const editPwd = () => {
  // router.push("/appList");
  state.dialogPwdVisible = true;
};
onMounted(() => {});
</script>
<style lang="scss" scoped>
:deep(.el-dropdown__popper.el-popper[role="tooltip"]) {
  background: red;
}
:deep(
    .el-dropdown-menu__item:not(.is-disabled):hover,
    .el-dropdown-menu__item:focus
  ) {
  color: #2a2b2e;
  font-weight: bold;
}
</style>
