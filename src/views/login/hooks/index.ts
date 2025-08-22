// vue hooks
import loginApi from "@/core/api/login";
import { ElMessage } from "element-plus";
import { useApp } from "@/pinia/modules/app";
import { useAccount } from "@/pinia/modules/account";

import { useRouter, useRoute } from "vue-router";

export const useLoginEffect = () => {
  const { initToken } = useApp();
  const { setUserInfo } = useAccount();
  const router = useRouter();
  const route = useRoute();
  const state = reactive({
    loading: false,
    pic: "",
    uuid: "",
  });

  const useForgetPwd = () => {
    console.log("点击了checkLogin");
  };
  const usePicCode = async () => {
    const {
      data: { img, uuid },
    } = await loginApi.getCaptcha({});
    state.pic = img;
    state.uuid = uuid;
    return { img, uuid };
  };
  const loginSubmit = async (loginParams: any) => {
    state.loading = true;
    await loginApi
      .loginPwd(loginParams)
      .then((res) => {
        state.loading = false;
        if (res.code == 200) {
          ElMessage.success("登录成功！");
          const { token } = res.data;
          psuhPage(res.data);
        } else {
          ElMessage.error(res.msg);
          usePicCode();
        }
      })
      .catch(() => {
        state.loading = false;
        usePicCode();
      });
  };
  const psuhPage = ({ token, userInfo }: any) => {
    initToken(token);
    setUserInfo(userInfo);
    // as string 类型断言
    const targetPath = decodeURIComponent(route.query.redirect as string);
    if (targetPath.startsWith("http")) {
      // 如果是一个url地址
      window.location.href = targetPath;
    } else if (targetPath.startsWith("/")) {
      // 如果是内部路由地址
      router.push(targetPath);
    } else {
      router.push("/");
    }
  };

  // 定义const 类型 不可变
  return {
    useForgetPwd,
    loginSubmit,
    usePicCode,
    useHooksState: state,
    psuhPage,
  } as const;
};
