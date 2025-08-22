import { defineStore } from "pinia";
// import { GetUserinfo } from '@/api/login'
import appApi from "@/core/api/app";
import { useMenus } from "@/pinia/modules/menu";

const mockUserInfo = {
  avatar: "http://pic3.zhimg.com/v2-1068164ce6bfca1208f375170f56c180_is.jpg",
  id: 1,
  name: "zhangsan",
  roleId: "100",
};
interface UserInfo {
  avatar: string;
  id: number;
  name: string;
  roleId: string;
}
interface AccountState {
  userInfo: any;
  permissionList: Array<string>;
  authInfo: any;
  token: string;
  cookie: string;
}

export const useAccount = defineStore("account", {
  state: (): AccountState => ({
    userInfo: null,
    permissionList: [],
    token: "",
    cookie: "",
    authInfo: null,
  }),
  getters: {
    isAdmin(state) {
      return this.userInfo?.roleId == 100;
    },
  },
  actions: {
    setUserInfo(data) {
      this.userInfo = data;
    },
    // 权限跟菜单信息存储
    setAuthInfo(data) {
      this.authInfo = data;
    },
    // 清除用户信息
    clearUserinfo() {
      this.userInfo = null;
      this.authInfo = null;
    },
    setHeaderToken(data) {
      const { token, cookie } = data;
      this.token = token;
      this.cookie = cookie;
    },
    // 获取用户信息
    async getUserinfo() {
      // const { code, res } = await appApi.getUserInfo();
      // // this.userInfo = mockUserInfo;
      // this.userInfo = res.data.userInfo;
      // const { menus, generateMenus } = useMenus();
      // generateMenus(res.data.menus).then(() => {
      //   return Promise.resolve(res.data);
      // });

      setTimeout(() => {
        this.userInfo = mockUserInfo;
        const { menus, generateMenus } = useMenus();
        generateMenus([]).then(() => {
          return Promise.resolve([]);
        });
      }, 1);
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "account", //自定义 Key值
        paths: ["userInfo", "authInfo"],
        storage: localStorage, // 选择存储方式
      },
    ],
  },
});
