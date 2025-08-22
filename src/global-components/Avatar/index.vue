<template>
  <div class="userInfo">
    <!-- <img class="avatar" :src="userInfo.avatar" /> -->
    <!-- <el-icon class="icon iconfont icon-yonghu avatar"></el-icon> -->
    <img class="img-user" src="@/assets/images/user-icon.png" alt="">
    <span class="name"> {{ userInfo && userInfo.name }}</span>
    <el-icon color="#c4c4c4" style="margin-left: 8px">
      <ArrowDown />
    </el-icon>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useUserInfo } from "./hooks/useUserInfor";

export default defineComponent({
  setup() {
    const { userInfo } = useUserInfo();
    return { userInfo };
  },
});
</script>
<style lang="scss" scoped>
.userInfo {
  .img-user {
    width: 28px;
    height: 28px;
    margin-right: 8px;
  }

  .name {
    font-size: 14px;
  }

  padding: 0 32px;
  line-height: 48px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #000;
  //   opacity: 0.6;
  font-size: 14px;

  .el-icon-caret-bottom {
    padding-left: 6px;
    color: #c4c4c4;
  }

  .el-icon-user {
    font-size: 20px;
    margin-right: 8px;
  }

  .avatar {
    // margin-right: 8px;
    // width: 32px;
    // height: 32px;
    border-radius: 50%;
    font-size: 16px;
    color: #666666;
    padding-right: 8px;
  }
}
</style>
