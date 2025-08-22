import Clipboard from "clipboard";
import { ElMessage } from "element-plus";
import type { Directive, DirectiveBinding } from "vue";

interface CopyBinding extends DirectiveBinding {
  value: string | (() => string);
}

const vCopy: Directive = {
  mounted(el: HTMLElement, binding: CopyBinding) {
    el._copyHandler = () => {
      el._clipboardInstance = new Clipboard(el);
      el.setAttribute("data-clipboard-action", "copy");
      el.setAttribute(
        "data-clipboard-text",
        typeof binding.value == "function" ? binding.value() : binding.value
      );

      el._clipboardInstance?.on("success", (e) => {
        ElMessage.success("复制成功");
        el._clipboardInstance?.destroy(); // 释放内存
      });
      el._clipboardInstance?.on("error", (e) => {
        ElMessage.error("当前浏览器不支持复制命令");
        el._clipboardInstance?.destroy(); // 释放内存
      });
    };

    el.addEventListener("click", el._copyHandler);
    el.style.cursor = "copy";
  },
  unmounted(el: HTMLElement) {
    delete el._clipboardInstance;
    if (el._copyHandler) {
      el.removeEventListener("click", el._copyHandler);
    }
  },
};

declare global {
  interface HTMLElement {
    _copyHandler?: () => void;
    _clipboardInstance?: Clipboard;
  }
}

export default vCopy;
