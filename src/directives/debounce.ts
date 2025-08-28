import type { Directive, DirectiveBinding } from "vue";

interface DebounceOptions {
  event?: string;
  delay?: number;
}

const vDebounce: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<Function>) {
    const defaultEvent = "click";
    const defaultDelay = 500;
    const options: DebounceOptions = {
      event: binding.arg?.split("_")?.[0] ?? defaultEvent,
      delay: binding.arg ? parseInt(binding.arg.split("_")[1]) : defaultDelay,
    };

    let timeout: number;
    el._debounceHandler = (e: Event) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        binding.value(e);
      }, options.delay);
    };
    el.addEventListener(options.event!, el._debounceHandler);
  },
  unmounted(el: HTMLElement) {
    if (el._debounceHandler) {
      const event = el._debounceHandler?.event || "click";
      el.removeEventListener(event, el._debounceHandler);
    }
  },
};

declare global {
  interface HTMLElement {
    _debounceHandler?: ((e: Event) => void) & { event?: string };
  }
}

export default vDebounce;
