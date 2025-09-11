import Clipboard from "clipboard";
import { ElMessage } from "element-plus";
import type { Directive, DirectiveBinding } from "vue";

interface CopyBinding extends DirectiveBinding {
  value: string | (() => string);
}

const vCopy: Directive = {
  mounted(el: HTMLElement, binding: CopyBinding) {
    // 初始化时就创建Clipboard实例
    const initializeClipboard = () => {
      // 如果已有实例，先销毁
      if (el._clipboardInstance) {
        el._clipboardInstance.destroy();
      }

      // 设置复制相关属性
      el.setAttribute("data-clipboard-action", "copy");
      el.setAttribute(
        "data-clipboard-text",
        typeof binding.value === "function" ? binding.value() : binding.value
      );

      // 创建新的Clipboard实例
      el._clipboardInstance = new Clipboard(el);

      // 绑定成功和失败事件
      el._clipboardInstance.on("success", () => {
        ElMessage.success("复制成功");
      });

      el._clipboardInstance.on("error", () => {
        ElMessage.error("当前浏览器不支持复制命令");
      });
    };

    // 初始化Clipboard
    initializeClipboard();

    // 点击事件直接触发复制
    el._copyHandler = () => {
      // 执行复制前更新可能变化的文本
      const text =
        typeof binding.value === "function" ? binding.value() : binding.value;
      el.setAttribute("data-clipboard-text", text);
    };

    el.addEventListener("click", el._copyHandler);
    el.style.cursor = "copy";
  },
  // 当绑定值变化时更新
  updated(el: HTMLElement, binding: CopyBinding) {
    if (binding.value !== binding.oldValue) {
      const text =
        typeof binding.value === "function" ? binding.value() : binding.value;
      el.setAttribute("data-clipboard-text", text);
    }
  },
  unmounted(el: HTMLElement) {
    // 清理工作
    el._clipboardInstance?.destroy();
    delete el._clipboardInstance;

    if (el._copyHandler) {
      el.removeEventListener("click", el._copyHandler);
      delete el._copyHandler;
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
