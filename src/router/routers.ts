import { RouteRecordRaw, _RouteRecordBase } from "vue-router";

const Layout = () => import("@/layout/index.vue");
const Home = () => import("@/views/home/home.vue");

const Error = () => import("@/views/error/index.vue");
const AppList = () => import("@/views/appList/index.vue");

declare module "vue-router" {
  interface _RouteRecordBase {
    hidden?: boolean | string | number;
    icon?: string;
    notsidemenu?: boolean | string | number;
    routerType?: string; //用来标记路由类型
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)",
    name: "not-found",
    component: Error,
    hidden: true,
    // props: {
    //   error: "404",
    // },
    meta: {
      title: "404",
    },
  },
  {
    path: "/appList",
    name: "AppList",
    hidden: true,
    component: AppList,
    meta: {
      title: "应用列表",
    },
  },
  {
    path: "/home",
    component: Layout,
    name: "工作台",
    meta: {
      title: "工作台",
      affix: true,
    },
    icon: "icon-ren",
    children: [
      {
        path: "/home",
        name: "home", // 这里如果是home 就代表是一级菜单，不添加面包屑导航
        component: Home,
        meta: {
          affix: true,
          title: "工作台",
        },
      },
    ],
  },
  {
    path: "/partialDemo",
    component: Layout,
    name: "partial",
    meta: {
      title: "partial",
      affix: true,
    },
    icon: "icon-ren",
    children: [
      {
        path: "/partialDemo",
        name: "partialDemo",
        component: () => import("@/views/widgets/partialDemo/index.vue"),
        meta: {
          affix: true,
          title: "partial",
        },
      },
    ],
  },
  {
    path: "/echartsDemo",
    component: Layout,
    name: "echarts",
    meta: {
      title: "echarts",
      affix: true,
    },
    icon: "icon-ren",
    children: [
      {
        path: "/echartsDemo",
        name: "echartsDemo",
        component: () => import("@/views/widgets/echartsDemo/index.vue"),
        meta: {
          affix: true,
          title: "echarts",
        },
      },
    ],
  },
  {
    path: "/warpDemo",
    component: Layout,
    name: "warp",
    meta: {
      title: "warp",
      affix: true,
    },
    icon: "icon-ren",
    children: [
      {
        path: "/warpDemo",
        name: "warpDemo",
        component: () => import("@/views/widgets/warpDemo/index.vue"),
        meta: {
          affix: true,
          title: "warp",
        },
      },
    ],
  },
  {
    path: "/antVDemo",
    component: Layout,
    name: "antV",
    meta: {
      title: "antV",
      affix: true,
    },
    icon: "icon-ren",
    children: [
      {
        path: "/antVDemo",
        name: "antVDemo",
        component: () => import("@/views/widgets/antVDemo/index.vue"),
        meta: {
          affix: true,
          title: "antV",
        },
      },
    ],
  },
];
export default routes;
