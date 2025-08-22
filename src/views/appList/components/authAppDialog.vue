<template>
  <el-dialog
    :model-value="dialogVisible"
    width="1050px"
    :show-close="false"
    @close="handleClose"
  >
    <div class="auth-type login">
      <div class="auth-type-img">
        <img :src="authImg" alt="" />
      </div>
      <div class="auth-form login_right">
        <div class="auth-form-header">
          {{ authObj.appName }}
          <el-icon @click="handleClose"><Close /></el-icon>
        </div>
        <div class="login_right_window">
          <template v-if="state.method == 1">
            <GlobalTabPanes
              :tabList="state.tabPatientList"
              :tabPosition="state.tabPatientList[0].label || ''"
            >
              <template #pwd>
                <PwdLogin
                  :showForgetPwd="false"
                  :authObj="props.authObj"
                  @loginAuthPwdSubmit="loginAuthPwdSubmit"
                />
              </template>
              <template #message>
                <MsgLogin
                  :showForgetPwd="false"
                  :authObj="props.authObj"
                  @loginAuthPwdSubmit="loginAuthPwdSubmit"
                />
              </template>
            </GlobalTabPanes>
          </template>
          <template v-else>
            <el-steps :active="state.active" align-center>
              <el-step
                :title="item.label"
                v-for="item in state.tabPatientList"
              />
              <!-- <el-step title="Step 2" description="Some description" />
            <el-step title="Step 3" description="Some description" />
            <el-step title="Step 4" description="Some description" /> -->
            </el-steps>
            <template v-if="state.active == 1">
              <!-- :authObj="props.authObj.ticket" -->
              <PwdLogin
                :showForgetPwd="false"
                :authObj="props.authObj"
                @loginAuthPwdSubmit="loginAuthPwdSubmit"
              />
            </template>
            <template v-if="state.active == 2">
              <!-- :authObj="props.authObj.ticket" -->
              <MsgLogin
                :showForgetPwd="false"
                :authObj="props.authObj"
                @loginAuthPwdSubmit="loginAuthPwdSubmit"
              />
            </template>
            <template>
              <el-button
                type="primary"
                class="btn submit_btn"
                @click="enterApp()"
                >进入系统</el-button
              >
            </template>
          </template>
          <!-- <el-button style="margin-top: 12px" @click="next"
            >Next step</el-button
          >
          <el-button style="margin-top: 12px" @click="state.active = 1"
            >init step</el-button
          > -->
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance } from "element-plus";
import objectApi from "@/core/api/objectManage";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import addAuthDivisorApi from "@/core/api/attestation";
import authImg from "@/assets/images/authtype.png";
// import { tabPatientList } from "./index";
import {
  DDLogin,
  MsgLogin,
  PwdLogin,
  WechatLogin,
} from "@/components/loginComponents/index";
import appApi from "@/core/api/app";

const route = useRoute();
interface State {
  unitInfos: {
    objectName: string;
    appId: string;
    type: string;
    status: string;
    parentId: number;
  };
  editLoading: boolean;
  tabPatientList: any[];
  method: any;
  active: number;
}

const state = reactive<State>({
  unitInfos: {
    objectName: "",
    type: "2",
    status: "1",
    parentId: 0,
    appId: route.query.appId as string,
  },
  editLoading: false,
  tabPatientList: [],
  method: 0,
  active: 1,
});
const FormRef = ref<FormInstance>();
const emit = defineEmits(["handleClose", "handleSubmit"]);
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    require: true,
    default: true,
  },
  authObj: {
    // 当前应用的认证因子
    type: Object,
    require: true,
    default: () => ({
      // appId: 129,
      // ticket: "860a14402bb54c36a549ad453a5fc962",
    }),
  },
  appId: {
    type: [String, Number],
    require: false,
    default: "",
  },
});

const loginAuthPwdSubmit = () => {
  //0 同时满足 1 满足任意一种
  if (props.authObj.method == 0) {
    next();
    if (state.active == state.tabPatientList.length) {
      emit("handleSubmit");
    }
  } else {
    emit("handleSubmit");
  }
};

const enterApp = () => {
  next();

  state.active = 1;
  emit("handleSubmit");
};
const next = () => {
  state.active++;
};
const handleClose = () => {
  emit("handleClose");
};

watch(
  () => props.authObj.ticket,
  (val) => {
    if (val) {
      // 初始化step
      if (state.active == 3) {
        state.active = 1;
      }

      state.method = props.authObj.method;
      if (props.authObj.data.length != 0) {
        // 满足任意条件处理
        state.tabPatientList = props.authObj.data.map((item, idx) => {
          return {
            ...item,
            label: item.authFactorName,
            id: item.authFactorId,
            // 1是密码类型 2 是短信类型
            domSlot: item.authFactorId == 1 ? "pwd" : "message",
          };
        });
        // 同时满足条件处理
        const data = {
          label: "完成认证",
          id: 999999999,
        };
        if (props.authObj.method == 0) {
          state.tabPatientList.push(data);
        }
      }
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>
<style lang="scss" scoped>
@import "./login.scss";
</style>

<style lang="scss" scoped>
.auth-type {
  display: flex;
  min-height: 500px;
}
.auth-type-img {
  width: 30%;
  img {
    height: 100%;
    width: 100%;
  }
}
.auth-form-header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  align-items: center;
  font-size: 17px;
  font-weight: 500;
  padding-left: 60px;
  justify-content: space-between;
  padding-right: 20px;
  color: rgba(0, 0, 0, 0.8);
  .el-icon {
    cursor: pointer;
  }
}
</style>
<style lang="scss">
.login_right {
  .el-steps {
    margin-left: -50px;
  }
  .login-form .el-form-item {
    margin: 30px auto;
    width: 350px;
  }
  .submit_btn {
    width: 280px;
    height: 40px;
    margin: 10px auto;
    display: block;
    background: #156cee;
  }
  .operate {
    line-height: 45px;
    text-align: right;
    padding-right: 20px;
    font-size: 14px;
    font-weight: 400;
    color: #0006;
  }
  .login-code {
    display: flex;
    width: 100%;
  }
  .login-code img {
    margin-left: 10px;
    width: 40%;
  }
}
.auth-type {
  .login-form .el-form-item {
    margin: 30px 45px;
  }
  .el-tabs__header {
    margin-left: 45px;
  }
  .submit_btn {
    margin: 10px 45px;
    width: 354px;
  }
  :deep(.el-input-group__prepend) {
    background-color: #fff;
    border: none;
  }
  .el-tabs__nav-wrap::after {
    background-color: #fff;
  }
  .el-tabs__item.is-active {
    color: rgba(80, 102, 225, 1);
  }
  .el-tabs__active-bar {
    background-color: rgba(80, 102, 225, 1);
    height: 4px;
  }
}
</style>
