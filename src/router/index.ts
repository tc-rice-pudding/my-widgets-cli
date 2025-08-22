import {
  createRouter,
  createWebHistory,
  Router,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from "vue-router";
import routes from "./routers";
import login from "./login";
// import pages from "./pages";

const scrollBehavior = function (
  to: RouteLocationNormalized,
  from: RouteLocationNormalizedLoaded,
  savedPosition: Record<string, any> | null
) {
  if (savedPosition) {
    return savedPosition;
  }
  const position: Record<string, any> = {};
  if (to.hash) {
    position.el = to.hash;
    position.behavior = "smooth";
    if (to.name === "Item") {
      position.top = 200;
    }
    if (/^#\w/.test(to.hash) || document.querySelector(to.hash)) {
      return position;
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return false;
  }
  return new Promise((resolve) => {
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some((m) => m.meta.scrollToTop)) {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.left = 0;
      position.top = 0;
    }
    resolve(position);
  });
};
const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    ...login,
    // ...pages,
    {
      path: "/",
      redirect: "/home",
    },
  ],
  // scrollBehavior,
});
// export const staticRoute = [];
export const staticRoute = routes;

export default router;
