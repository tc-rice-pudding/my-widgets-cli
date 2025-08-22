import type { Directive, DirectiveBinding } from "vue";

interface ResizeObserverEntry {
  target: Element;
  contentRect: DOMRectReadOnly;
}
interface ResizeDirectiveBinding extends DirectiveBinding {
  value: (entry: ResizeObserverEntry) => void;
}

function checkResize(entry: ResizeObserverEntry) {
  let flag = true;

  const {width, height} = entry.contentRect;
  const {width:lastWidth, height:lastHeight} = (entry.target as HTMLElement)._lastContentRect ?? {};

  if (width == lastWidth && height == lastHeight) {
    flag = true;
  } else {
    (entry.target as HTMLElement)._lastContentRect = {width: entry.contentRect.width, height: entry.contentRect.height} as DOMRectReadOnly;
    flag = false;
  }

  return flag;
}

const vResize: Directive = {
  mounted(el: HTMLElement, binding: ResizeDirectiveBinding) {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        console.log("新尺寸:", entry.contentRect.width, entry.contentRect.height);

        if (!checkResize(entry) && typeof binding.value == "function") {
          binding.value(entry);
        }
      }
    });
    observer.observe(el as Element);
    el._resizeObserver = observer;
  },
  unmounted(el: HTMLElement) {
    el._resizeObserver?.unobserve(el); // 适用于只需要停止监听某个特定的元素时
    // el._resizeObserver?.disconnect(); // 适用于需要完全停止所有元素的监听时
  },
};

declare global {
  interface HTMLElement {
    _resizeObserver?: ResizeObserver;
    _lastContentRect?: DOMRectReadOnly;
  }
}

export default vResize;
