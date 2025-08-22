import { defineStore } from "pinia";
// import { fixedRoutes, asyncRoutes } from '@/router'
import router, { staticRoute } from "@/router";
import { Menus, MenuItem, AsyncMenus } from "@/core/interface/menu/index";
import _ from "lodash";
import { permission } from "@/directives/has";

const modules = import.meta.glob("../../views/**/**.vue");

// import { GetMenus } from '@/core/api/menu'

const generateUrl = (path, parentPath) => {
  return path.startsWith("/")
    ? path
    : path
    ? `${parentPath}/${path}`
    : parentPath;
};

export const formatRoutes = (data: any): any => {
  let aRouter = [];
  aRouter = data.map((item) => {
    const { path, name, component, children, icon, title, affix } = item;
    const haveChildren =
      Array.isArray(item.children) && item.children.length > 0;
    item.meta = { title, affix };
    if (item.component.includes("layout")) {
      item.component = () => import("@/layout/index.vue");
    } else {
      item.component = modules[`../../${component}.vue`];
    }
    if (haveChildren) {
      formatRoutes(item.children);
    }
    return item;
  });
  aRouter.forEach((route) => router.addRoute(route));
  return aRouter;
};

// 菜单过滤
const getFilterMenus = (arr: Array<Menus>) => {
  const menus: Array<MenuItem> = [];
  arr.forEach((item) => {
    if (!item.hidden) {
      // 配置为hidden的不放到路由展示入口中
      const menu: MenuItem = {
        url: generateUrl(item.path, ""),
        title: item.meta.title,
        icon: item.icon,
        hidden: item.hidden,
        permission: item.meta.permission || "",
        children: [],
      };
      if (
        (item.children &&
          item.children.length === 1 &&
          item.children[0].path !== item.path) ||
        (item.children && item.children.length > 1)
      ) {
        menu.children = getFilterMenus(item.children);
      }

      menus.push(menu);
    }
  });
  return menus;
};
interface MenusState {
  menus: Array<MenuItem>;
}
export const useMenus = defineStore("menu", {
  state: (): MenusState => ({
    menus: [],
  }),
  actions: {
    generateMenus(data) {
      // const result = assembleMenu(data);
      const asyncRoute = formatRoutes(data);
      // router.addRoute({
      //   path: "/:pathMatch(.*)*",
      //   name: "not-found",
      //   component: () => import("@/views/error/index.vue"),
      //   props: {
      //     error: "404",
      //   },
      // });

      const menus = getFilterMenus([...staticRoute, ...asyncRoute]);
      this.menus = menus;
      console.log("menus", menus);

      return Promise.resolve();
    },
    setMenus(data) {
      this.menus = data;
    },
  },
});
