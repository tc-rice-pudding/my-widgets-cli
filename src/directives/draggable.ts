import type { Directive } from "vue";

interface DraggableOptions {
  axis?: "x" | "y" | "both";
  handle?: HTMLElement | null;
}

const vDraggable: Directive<HTMLElement, DraggableOptions | undefined> = {
  mounted(el, binding) {
    const options = binding.value || {};
    const handle = options.handle || el;

    let startX = 0;
    let startY = 0;
    let initialX = 0;
    let initialY = 0;

    handle.style.cursor = "move";
    handle.style.position = "absolute";

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      startX = e.clientX;
      startY = e.clientY;
      initialX = el.offsetLeft;
      initialY = el.offsetTop;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (options.axis !== "y") {
          el.style.left = `${initialX + dx}px`;
        }
        if (options.axis !== "x") {
          el.style.top = `${initialY + dy}px`;
        }
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    handle.addEventListener("mousedown", onMouseDown);

    el._draggableCleanup = () => {
      handle.removeEventListener("mousedown", onMouseDown);
    };
  },
  unmounted(el) {
    el._draggableCleanup?.();
  },
};

declare global {
  interface HTMLElement {
    _draggableCleanup?: () => void;
  }
}

export default vDraggable;
