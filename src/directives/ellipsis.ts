import type { Directive } from "vue";

interface EllipsisOptions {
  line?: number; // 行数，默认1行
  content?: string; // 自定义内容
}

const vEllipsis: Directive<HTMLElement, EllipsisOptions | string | undefined> = {
    mounted(el, binding) {
      const options: EllipsisOptions =
        typeof binding.value === "object" && binding.value != null
          ? binding.value
          : { content: binding.value };

      const line = options.line || 1;
      const content = options.content || el.textContent || "";

      el.style.overflow = "hidden";
      el.style.textOverflow = "ellipsis";
      el.style.display = "-webkit-box";
      el.style.webkitLineClamp = String(line);
      el.style.webkitBoxOrient = "vertical";
      el.style.whiteSpace = "nowrap";

      if (options.content) {
        el.textContent = content;
      }
    },
    updated(el, binding) {
      const options: EllipsisOptions =
        typeof binding.value === "object"
          ? binding.value
          : { content: binding.value };

      if (options.content) {
        el.textContent = options.content;
      }
    },
  };

export default vEllipsis;
