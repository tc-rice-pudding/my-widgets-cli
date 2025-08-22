<template>
  <GlobalHeader />
  <div class="applist">
    <div v-if="state.tableData.length != 0">
      <h4>应用选择</h4>
      <p>选择任一应用点击进入</p>
    </div>
    <div class="applist-content" :loading="state.loading">
      <div
        class="app-item"
        v-for="row in state.tableData"
        @click="handleApp(row)"
        :class="{ 'active-app': row.objectId == state.appId }"
      >
        <img :src="row.icon" alt="" v-if="row.icon" />
        <!-- <img src="../../assets/images/app.png" alt="" v-else/> -->
        <div v-else class="app-icon">
          <el-icon class="font_family icon-yingyong" size="25px"></el-icon>
        </div>
        <div class="app-name">
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="row.objectName"
            placement="top"
          >
            <span
              class="f12 appname"
              :class="{ 'active-appname': row.objectId == state.appId }"
              >{{ row.objectName }}</span
            >
          </el-tooltip>
        </div>
      </div>
    </div>
    <div v-if="state.tableData.length == 0" class="no-data">
      当前账号暂无应用权限，请先配置应用权限后登录
    </div>
    <div class="enter-app" v-if="state.tableData.length != 0">
      <el-button
        type="primary"
        color="#216DD9"
        class="applist-enter-btn"
        :disabled="!state.appId"
        :loading="state.enterAppLoading"
        @click="enterApp()"
        >进入系统</el-button
      >
    </div>

    <AuthAppDialog
      :authObj="state.authObj"
      :appName="state.appName"
      :dialogVisible="state.dialogVisible"
      @handleSubmit="handleSubmit"
      @handleClose="handleClose"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { AuthAppDialog } from "./components";
import appApi from "@/core/api/app";
import loginApi from "@/core/api/login";
import { useUserInfo } from "@/core/hooks/useUserInfor";
import { ElMessage } from "element-plus";
import { useAccount } from "@/pinia/modules/account";

const { setAuthInfo, authInfo } = useAccount();

const { userInfo } = useUserInfo();
const state = reactive({
  tableData: [],
  loading: false,
  appId: "",
  policyId: "",
  dialogVisible: false,
  enterAppLoading: false,
  ticket: "", // 访问应用时需要的入场密钥
  authObj: {}, // 当前应用认证因子
}) as any;

const getTreeInfo = () => {
  state.loading = true;
  appApi
    .getAppByUserId({ userId: userInfo.value.userId }, "list")
    .then((res) => {
      if (res.code == 200) {
        state.loading = false;
        state.tableData = res.data;
        state.total = res.total as number;
      }
    })
    .catch(() => {
      state.loading = false;
    });
};
const handleClose = () => {
  state.dialogVisible = false;
};
const handleSubmit = () => {
  state.dialogVisible = false;
  try {
    console.log(state.routePath, "state.routePath");
    if (authInfo.menus && authInfo.menus.length == 0) {
      ElMessage.warning("当前用户无菜单权限，请联系管理员");
      return;
    }
    window.open(state.routePath, "_blank");
  } catch (error) {
    ElMessage.error("应用路径校验异常，请联系管理员");
  }
};

const handleApp = (row) => {
  state.appId = row.objectId;
  state.appName = row.objectName;
  state.policyId = row.policyId;
  state.routePath = row.routePath;
};
const enterApp = () => {
  authfactors();
};
//查询应用认证因子
const authfactors = () => {
  state.enterAppLoading = true;
  appApi
    .authfactors({ objectId: state.appId })
    .then((res) => {
      state.enterAppLoading = false;
      if (res.code == 200) {
        const { data, ticket } = res.data;
        state.authObj = {
          ...res.data,
          appId: state.appId,
          appName: state.appName,
        };
        if (data.length == 0) {
          loginAuth(ticket);
        } else {
          state.dialogVisible = true;
        }
      }
    })
    .catch(() => {
      state.enterAppLoading = false;
    });
};
// 无认证因子访问应用
const loginAuth = (ticket: string) => {
  const params = {
    loginType: "no-auth",
    appId: state.appId,
    ticket,
  };
  loginApi.loginAuth(params).then((res) => {
    console.log(res, "res");
    setAuthInfo(res.data);
    try {
      window.open(state.routePath);
    } catch (error) {
      ElMessage.success("应用路径校验异常，请联系管理员");
    }
  });
};

onMounted(() => {
  getTreeInfo();
});
</script>

<style lang="scss" scoped>
.applist {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/app.png");
  background-size: 100%;
  .active-app {
    color: $mainColor;
    border: 1px solid $mainColor;
    box-sizing: border-box;
    .app-icon {
      border: 1px solid $mainColor;
      color: $mainColor;
      background: rgba(33, 109, 217, 0.2);
    }
    .el-icon {
      color: $mainColor;
    }
  }
  h4,
  p,
  .enter-app {
    text-align: center;
  }
  h4 {
    font-size: 20px;
    margin-top: 100px;
  }
  p {
    margin-top: 10px;
    color: rgba(0, 0, 0, 0.6);
  }
}
.applist-content {
  width: 940px;
  margin: 100px auto;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  height: 240px;
}
.app-name {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  .app-create-date {
    color: #666666;
  }
  .appname {
    font-weight: 500;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.8);
  }
  .active-appname {
    color: $mainColor;
  }
  .app-create-date,
  .appname {
    text-align: left;
    width: 110px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.app-item {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin: 0 20px 20px 0;
  padding-left: 20px;
  cursor: pointer;
  height: 100px;
  background: #fff;
  border-radius: 9px;
  width: 210px;
  img {
    width: 50px;
    height: 50px;
    margin-right: 9px;
    border-radius: 50%;
  }
  .el-icon {
    color: rgba(0, 0, 0, 0.5);
  }
  .app-icon {
    width: 50px;
    height: 50px;
    margin-right: 9px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
  }
}
.applist {
  :deep(.el-dialog__header) {
    display: none;
    margin-right: 0px;
    border-bottom: 0px solid #f2f2f2;
  }
  :deep(.el-dialog__body) {
    padding: 0px;
  }
}
.no-data {
  margin: 140px auto;
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
}
.applist-enter-btn {
  width: 180px;
  height: 44px;
  line-height: 44px;
}
</style>
