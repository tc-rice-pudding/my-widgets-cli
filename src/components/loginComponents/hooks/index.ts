// vue hooks
import loginApi from "@/core/api/login";
import { ElMessage } from "element-plus";
import { useApp } from "@/pinia/modules/app";
import { useAccount } from "@/pinia/modules/account";
import { useRouter, useRoute } from "vue-router";

export const useLoginEffect = () => {
  //应用外部登录处理逻辑
  const { initToken } = useApp();

  const { setUserInfo, setAuthInfo } = useAccount();
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
    if (loginParams.username == "admin") {
      initToken("1111");
      setUserInfo({ username: "admin" });
      router.push("/");
    }
    state.loading = true;
    await loginApi
      .loginPwd(loginParams)
      .then((res) => {
        state.loading = false;
        if (res.code == 200) {
          ElMessage.success("登录成功！");
          const { token } = res.data;
          psuhPage(res.data);
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
    router.push("/appList");
    // as string 类型断言
    // const targetPath = decodeURIComponent(route.query.redirect as string);
    // if (targetPath.startsWith("http")) {
    //   // 如果是一个url地址
    //   window.location.href = targetPath;
    // } else if (targetPath.startsWith("/")) {
    //   // 如果是内部路由地址
    //   router.push(targetPath);
    // } else {
    //   router.push("/appList");
    // }
  };

  /**
   * 应用内部登录处理逻辑
   */
  const loginAuthSubmit = async (loginParams: any) => {
    state.loading = true;
    await loginApi
      .loginAuth(loginParams)
      .then((res) => {
        state.loading = false;
        if (res.code == 200) {
          if (res.data) {
            const { appToken, menus } = res.data;
            if (appToken) {
              setAuthInfo(res.data);
            }
            ElMessage.success("登录成功！");
          } else {
            ElMessage.success("验证成功！!");
          }
          // const { appToken, menus } = res.data;
          // if (menus && menus.length != 0) {
          // } else {
          //   ElMessage.success("验证成功！!");
          // }
          // if (appToken) {
          //   setAuthInfo(res.data);
          // }
          return Promise.resolve(res);

          // psuhPage(res.data);
        }
      })
      .catch(() => {
        state.loading = false;
        usePicCode();
        throw new Error("登录失败");
      });
  };
  const checkLogin = () => {};

  // 定义const 类型 不可变
  return {
    useForgetPwd,
    loginSubmit,
    usePicCode,
    useHooksState: state,
    psuhPage,
    checkLogin,
    loginAuthSubmit,
  } as const;
};
