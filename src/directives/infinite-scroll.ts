import type { Directive, DirectiveBinding } from "vue";

interface InfiniteScrollOptions {
  distance: number;
  disabled?: boolean;
  delay?: number;
}

const vInfiniteScroll: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<() => void>) {
    const options: InfiniteScrollOptions = {
      distance: 50,
      disabled: false,
      delay: 200,
      ...(binding.value as any),
    };

    let isLoading = false;

    const onScroll = () => {
      if (options.disabled || isLoading) return;

      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight;
      const clientHeight = el.clientHeight;

      if (scrollHeight - (scrollTop + clientHeight) <= options.distance) {
        isLoading = true;
        setTimeout(() => {
          binding.value();
          isLoading = false;
        }, options.delay);
      }
    };

    el.addEventListener("scroll", onScroll);
    el._infiniteScrollCleanup = () => {
      el.removeEventListener("scroll", onScroll);
    };
  },
  unmounted(el: HTMLElement) {
    el._infiniteScrollCleanup?.();
  },
};

declare global {
  interface HTMLElement {
    _infiniteScrollCleanup?: () => void;
  }
}

export default vInfiniteScroll;
