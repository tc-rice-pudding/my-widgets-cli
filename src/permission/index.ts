import { ElLoading } from "element-plus";
import router from "@/router";
import auth from "@/utils/token";
// import { authorized } from '@/config/env/checkEnv';
import { useAccount } from "@/pinia/modules/account";
import { useApp } from "@/pinia/modules/app";
import { useMenus } from "@/pinia/modules/menu";
import { getPluginToken } from "./pluginMode";
// import { permission } from "@/directives/has";
const adminId = (window as any).globalConstant.adminId;

const loadingInstance = ElLoading.service({
  lock: true,
  text: "正在加载数据，请稍候~",
  background: "rgba(0, 0, 0, 0.7)",
});
const getPageTitle = (title: string) => {
  const { title: appTitle } = useApp();
  if (title) {
    return `${title} - ${appTitle}`;
  }
  return appTitle;
};

// 白名单，里面是路由对象的name
const WhiteList = ["login", "lock"];
// 这里 => ts need return val so disabled
// eslint-disable-next-line consistent-return
router.beforeEach(async (to: any, from) => {
  console.log("to", to);

  const { authorization } = useApp();
  document.title = getPageTitle(!!to.meta && to.meta.title);
  const { userInfo, authInfo, getUserinfo } = useAccount();

  if (!authorization && WhiteList.includes(to.name)) {
    loadingInstance.close();
    return true;
  }

  // await getPluginToken()

  if (!authorization) {
    loadingInstance.close();
    return {
      name: "login",
      query: {
        redirect: to.fullPath, // redirect是指登录之后可以跳回到redirect指定的页面
      },
      replace: true,
    };
  }

  //存在authorization 禁止进去登录页面
  if (authorization && WhiteList.includes(to.name)) {
    loadingInstance.close();
    return from.path;
  }
  // // 存在token 不存在应用验证消息，不允许进入应用 ，只能停留在应用选择页面
  // if (authorization) {
  //   loadingInstance.close();
  //   return true;
  // }
  // 处理动态路由，如果选择动态路由权限的话
  const { menus } = useMenus();
  if ((menus.length == 0 || !menus) && authorization) {
    try {
      // 获取用户信息
      await getUserinfo();
      loadingInstance.close();
      return true;
    } catch (err) {
      loadingInstance.close();
      return false;
    }
  }

  // if (!store.state.account.userInfo) {
  //   store.dispatch("account/getUserInfo").then(() => {
  //     return to.fullPath;
  //   });
  // }
});
