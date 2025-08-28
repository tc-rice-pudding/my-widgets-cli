import type { Directive, DirectiveBinding } from "vue";

interface ClickOutsideBinding extends DirectiveBinding {
  value: (e: Event) => void; // 回调函数
}

const vClickOutside: Directive = {
  beforeMount(el: HTMLElement, binding: ClickOutsideBinding) {
    el._clickOutsideHandler = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event);
      }
    };
    document.addEventListener("click", el._clickOutsideHandler);
  },
  unmounted(el: HTMLElement) {
    if (el._clickOutsideHandler) {
      document.removeEventListener("click", el._clickOutsideHandler);
    }
  },
};

declare global {
  interface HTMLElement {
    _clickOutsideHandler?: (e: Event) => void;
  }
}

export default vClickOutside;
