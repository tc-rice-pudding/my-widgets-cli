import type { Directive } from "vue";

interface BacktopOptions {
  visibilityHeight?: number; // 滚动多少距离显示按钮
  right?: string; // 距离右侧距离
  bottom?: string; // 距离底部距离
  transition?: string; // 过渡效果
  scrollContainer?: HTMLElement | string; // 滚动条容器
}

interface BacktopElement extends HTMLElement {
  _backtopHandler?: () => void;
  _backtopScrollHandler?: () => void;
  _scrollContainer: HTMLElement;
}

const vBacktop: Directive<BacktopElement, BacktopOptions | undefined> = {
  mounted(el, binding) {
    const options: BacktopOptions = binding.value || {};
    const {
      visibilityHeight = 200,
      right = "40px",
      bottom = "40px",
      transition = "all .3s",
    } = options;
    const scrollContainer =
      (typeof options.scrollContainer == "string"
        ? document.getElementById(options.scrollContainer)
        : options.scrollContainer) ?? window;

    // 设置按钮样式
    Object.assign(el.style, {
      position: "fixed",
      right,
      bottom,
      cursor: "pointer",
      transition,
      opacity: "0",
      visibility: "hidden",
      'z-index': 1
    });

    // 滚动事件处理
    const scrollHandler = () => {
      const scrollTop = scrollContainer==window?(document.documentElement || document.body).scrollTop:(scrollContainer as HTMLElement).scrollTop;
      if (scrollTop > visibilityHeight) {
        el.style.opacity = "1";
        el.style.visibility = "visible";
      } else {
        el.style.opacity = "0";
        el.style.visibility = "hidden";
      }
    };

    // 点击返回顶部
    const clickHandler = () => {
      scrollContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    el._scrollContainer = scrollContainer as HTMLElement;
    el._backtopScrollHandler = scrollHandler;
    el._backtopHandler = clickHandler;

    scrollContainer.addEventListener("scroll", scrollHandler);
    el.addEventListener("click", clickHandler);

    // 初始检查
    scrollHandler();
  },
  unmounted(el: BacktopElement) {
    if (el._backtopScrollHandler && el._scrollContainer) {
      el._scrollContainer.removeEventListener(
        "scroll",
        el._backtopScrollHandler
      );
    }
    if (el._backtopHandler) {
      el.removeEventListener("click", el._backtopHandler);
    }
  },
};

export default vBacktop;
