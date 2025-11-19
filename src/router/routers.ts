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
    path: "/directiveDemo",
    component: Layout,
    name: "directiveDemo",
    meta: {
      title: "directiveDemo",
      affix: true,
    },
    icon: "icon-ren",
    children: [
      {
        path: "/directiveDemo",
        name: "directiveDemo",
        component: () => import("@/views/widgets/directiveDemo/index.vue"),
        meta: {
          affix: true,
          title: "warp",
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
  {
    path: "/dynamicForm",
    component: Layout,
    name: "动态表单",
    meta: {
      title: "动态表单",
      affix: true,
    },
    icon: "icon-ren",
    children: [
      {
        path: "/dynamicForm",
        name: "dynamicForm", // 这里如果是home 就代表是一级菜单，不添加面包屑导航
        component: () => import("@/views/dynamicForm/index.vue"),
        meta: {
          affix: true,
          title: "动态表单",
        },
      },
    ],
  },
  {
    path: "/tableDemo",
    component: Layout,
    name: "表格",
    meta: {
      title: "表格",
      affix: true,
    },
    icon: "icon-ren",
    children: [
      {
        path: "/tableDemo",
        name: "tableDemo", // 这里如果是home 就代表是一级菜单，不添加面包屑导航
        component: () => import("@/views/widgets/tableDemo/index.vue"),
        meta: {
          affix: true,
          title: "表格",
        },
      },
      {
        path: "/detail",
        name: "detail", // 这里如果是home 就代表是一级菜单，不添加面包屑导航
        component: () =>
          import("@/views/widgets/tableDemo/components/detail.vue"),
        meta: {
          affix: true,
          title: "表格",
        },
        hidden: true,
      },
    ],
  },
  {
    path: "/schedulerMgr",
    component: Layout,
    name: "调度器",
    meta: {
      title: "调度器",
      affix: true,
    },
    icon: "icon-ren",
    children: [
      {
        path: "/schedulerMgr",
        name: "schedulerMgr", // 这里如果是home 就代表是一级菜单，不添加面包屑导航
        component: () => import("@/views/widgets/schedulerMgr/index.vue"),
        meta: {
          affix: true,
          title: "调度器",
        },
      },
    ],
  },
  {
    path: "/paramsMgr",
    component: Layout,
    name: "系统配置",
    meta: {
      title: "系统配置",
      affix: true,
    },
    icon: "icon-ren",
    children: [
      {
        path: "/paramsMgr",
        name: "paramsMgr",
        component: () => import("@/views/paramsMgr/index.vue"),
        meta: {
          affix: true,
          title: "系统参数配置",
        },
      },
      {
        path: "/dictMgr",
        name: "dictMgr",
        component: () => import("@/views/dictMgr/index.vue"),
        meta: {
          affix: true,
          title: "字典配置",
        },
      },
    ],
  },
  {
    path: "/adaptScreenDemo",
    component: Layout,
    name: "大屏自适应",
    meta: {
      title: "大屏自适应",
      affix: true,
    },
    icon: "icon-ren",
    children: [
      {
        path: "/adaptScreenDemo",
        name: "adaptScreenDemo", // 这里如果是home 就代表是一级菜单，不添加面包屑导航
        component: () => import("@/views/widgets/adaptScreenDemo/index.vue"),
        meta: {
          affix: true,
          title: "大屏自适应",
        },
      },
    ],
  },
];
export default routes;
