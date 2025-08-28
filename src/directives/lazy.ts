import type { Directive, DirectiveBinding } from "vue";

const vLazy: Directive = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding<string>) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.src = binding.value;
            observer.unobserve(el);
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    observer.observe(el);
    el._lazyObserver = observer;
  },
  unmounted(el: HTMLImageElement) {
    el._lazyObserver?.unobserve(el);
  },
};

declare global {
  interface HTMLElement {
    _lazyObserver?: IntersectionObserver;
  }
}

export default vLazy;
