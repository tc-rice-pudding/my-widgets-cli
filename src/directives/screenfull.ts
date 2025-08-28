import screenfull from "screenfull";
import type { Directive, DirectiveBinding } from "vue";

interface ScreenfullElement extends HTMLElement {
  _screenfullHandler?: () => void;
}

interface ScreenfullOptions {
  isFullscreen?: boolean; // 初始值是否全屏
  container: HTMLElement | string;
}

const vScreenfull: Directive<ScreenfullElement, ScreenfullOptions> = {
  mounted(el, binding) {
    if (!screenfull.isEnabled) {
      console.warn("浏览器不支持全屏API");
      return;
    }

    let { isFullscreen = false, container } =  binding.value ?? {};
    container = (typeof container === "string" ? document.querySelector(container) : container) as HTMLElement;
    try {
      if (!container) throw new Error("container元素不存在");
    } catch (error) {
      console.error("container选择器无效:", error);
    }

    const toggleFullscreen = () => {
      if (screenfull.isFullscreen) {
        screenfull.exit().catch((err) => {
          console.error("退出全屏失败:", err);
        });
      } else {
        screenfull.request(container).catch((err) => {
          console.error("全屏失败:", err);
        });
      }
    };

    el._screenfullHandler = toggleFullscreen;
    el.addEventListener("click", el._screenfullHandler);

    // 初始状态设置
    if (isFullscreen && !screenfull.isFullscreen) {
      screenfull.request(container).catch((err) => {
        console.error("初始全屏失败:", err);
      });
    }
  },
  unmounted(el: ScreenfullElement) {
    if (el._screenfullHandler) {
      el.removeEventListener("click", el._screenfullHandler);
    }
  },
};

export default vScreenfull;
