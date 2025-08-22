/* eslint-disable import/prefer-default-export */
import { onBeforeMount, onBeforeUnmount, computed } from "vue";
import { storeToRefs } from "pinia";
import { useApp } from "@/pinia/modules/app";

const WIDTH = 768;
export const useResizeHandler = () => {
  const appStore = useApp();
  const { sidebar } = storeToRefs(appStore);
  const { setDevice, setCollapse } = appStore;
  const collapse = computed(() => sidebar.value.collapse);

  const isMobile = () => {
    return window.innerWidth < WIDTH;
  };

  const resizeHandler = () => {
    if (isMobile()) {
      setDevice("mobile");
      setCollapse(true);
    } else {
      setDevice("desktop");
      setCollapse(collapse.value);
    }
  };

  onBeforeMount(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeHandler);
  });

  // // 监听路由的时候不能使用useRoute获取路由，否则会有警告
  // watch(route, () => {
  //   if (store.state.app.device === 'mobile' && !store.state.app.sidebar.collapse) {
  //     store.commit('app/setCollapse', 1)
  //   }
  // })
};
