<template>
  <div class="error-page">
    <img :src="httpCodeFunc(error).img" alt="" />
    <div class="desc">{{ error }}</div>
    <div class="tips">
      {{ httpCodeFunc(error).tips }}
    </div>
  </div>
  <!-- <div class="error">
    <img :src="Empty" alt="" class="not-found-img" />
    <template v-if="statusError == '403'">
      <h2 class="title">您无权访问此页面</h2>
    </template>
    <template v-else-if="error === '500'">
      <h2 class="title">服务器出错了</h2>
    </template>
    <template v-else-if="error === '404'">
      <h2 class="title">您访问的页面不存在</h2>
    </template>
    <el-button type="primary" color="#216DD9" @click="goHome">返回</el-button>
  </div> -->
</template>

<script>
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTags } from "@/pinia/modules/tags";
// import Empty from "@/assets/images/Empty.webp";
import Img403 from "@/assets/images/error/403.png";
import Img404 from "@/assets/images/error/404.png";
import Img500 from "@/assets/images/error/500.png";
import ImgCommon from "@/assets/images/error/common.png";

const { delTag } = useTags();

export default defineComponent({
  props: {
    error: {
      type: String,
      default: "404",
    },
  },
  setup(props) {
    const httpCodeConfig = ref({
      403: {
        tips: "访问被拒绝，您可能需要登录或获得权限。",
        img: Img403,
      },
      404: {
        tips: "找不到页面，您可能输入了错误的网址或点击了无效的链接。",
        img: Img404,
      },
      500: {
        tips: "看起来我们的服务器出了点小差错，请稍后再试。",
        img: Img500,
      },
      common: {
        tips: "看起来出了点问题，我们正在努力修复。",
        img: ImgCommon,
      },
    });
    const route = useRoute();

    console.log(route.query.error, "props");
    const state = reactive({
      // Empty,
      statusError: route.query.error,
    });
    const router = useRouter();
    const goHome = () => {
      delTag();
      router.push("/appList");
    };
    const httpCodeFunc = (code) => {
      if (["403", "404", "500"].includes(code)) {
        return httpCodeConfig.value[code];
      } else {
        return httpCodeConfig.value.common;
      }
    };
    return {
      goHome,
      httpCodeFunc,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.error-page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  img {
    width: 284px;
    margin-top: 10%;
  }
  .desc {
    font-weight: bold;
    font-size: 40px;
    color: #000;
    margin-top: 32px;
  }
  .tips {
    font-size: 20px;
    color: #666;
    margin-top: 12px;
  }
}
</style>
