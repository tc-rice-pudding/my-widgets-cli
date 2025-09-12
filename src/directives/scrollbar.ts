import { DirectiveBinding, ObjectDirective } from "vue";

// 定义滚动条样式配置的类型
interface ScrollbarStyleOptions {
  /** 滚动条宽度 */
  width?: string;
  /** 滚动条轨道颜色 */
  trackColor?: string;
  /** 滚动条滑块颜色 */
  thumbColor?: string;
  /** 滚动条滑块悬停颜色 */
  thumbHoverColor?: string;
  /** 滚动条滑块圆角 */
  borderRadius?: string;
  /** 滚动条滑块最小高度 */
  minThumbHeight?: string;
  /** 是否在非hover状态下隐藏滚动条 */
  autoHide?: boolean;
  /** 纵向滚动条是否启用 */
  vertical?: boolean;
  /** 横向滚动条是否启用 */
  horizontal?: boolean;
}

// 默认配置
const defaultOptions: ScrollbarStyleOptions = {
  width: "6px",
  trackColor: "transparent",
  thumbColor: "#c1c1c1",
  thumbHoverColor: "#a8a8a8",
  borderRadius: "3px",
  minThumbHeight: "30px",
  autoHide: true,
  vertical: true,
  horizontal: false,
};

// 扩展HTMLElement类型，添加自定义属性
declare global {
  interface HTMLElement {
    _scrollbarStyle?: {
      styleElement: HTMLStyleElement;
      uniqueClass: string;
    };
  }
}

// 生成唯一类名
const generateUniqueClass = () =>
  `scrollbar-${Math.random().toString(36).substring(2, 12)}`;

const generateStyle = (
  el: HTMLElement,
  binding: DirectiveBinding<ScrollbarStyleOptions>
) => {
  // 合并配置
  const options: ScrollbarStyleOptions = {
    ...defaultOptions,
    ...binding.value,
  };

  // 生成唯一类名，避免样式冲突
  const uniqueClass = generateUniqueClass();
  el.classList.add(uniqueClass);

  // 创建样式元素
  const style = document.createElement("style");

  // 基础样式
  let styleContent = `.${uniqueClass} {
    // width: calc(${el.offsetWidth}px + ${options.width} + 4px) !important;
    ${options.vertical && "overflow-y: auto;"}
    ${options.horizontal && "overflow-x: auto;"}
    scrollbar-width: thin; // Firefox
    scrollbar-color: ${options.thumbColor} ${options.trackColor};
  }`;

  // WebKit内核浏览器滚动条样式 (Chrome, Safari等)
  styleContent += `.${uniqueClass}::-webkit-scrollbar {
    width: ${options.width};
    height: ${options.width};
  }`;

  // 轨道样式
  styleContent += `.${uniqueClass}::-webkit-scrollbar-track {
    background: ${options.trackColor};
    border-radius: ${options.borderRadius};
  }`;

  // 滑块样式
  styleContent += `.${uniqueClass}::-webkit-scrollbar-thumb {
    background-color: ${options.thumbColor};
    border-radius: ${options.borderRadius};
    min-height: ${options.minThumbHeight};
    transition: background-color 0.2s ease;
  }`;

  // 滑块悬停样式
  styleContent += `.${uniqueClass}::-webkit-scrollbar-thumb:hover {
    background-color: ${options.thumbHoverColor};
  }`;

  // 自动隐藏功能
  if (options.autoHide) {
    styleContent += `.${uniqueClass} {
      scrollbar-width: thin;
      scrollbar-color: transparent transparent;
      transition: scrollbar-color 0.3s;
    }`;
    styleContent += `.${uniqueClass}:hover {
      scrollbar-width: thin;
      scrollbar-color: #d6d8dd transparent;
    }`;
  }

  style.textContent = styleContent;
  document.head.appendChild(style);

  // 存储引用以便后续清理
  el._scrollbarStyle = {
    styleElement: style,
    uniqueClass,
  };
};

// 自定义滚动条指令
const customScrollbarDirective: ObjectDirective<
  HTMLElement,
  ScrollbarStyleOptions
> = {
  mounted(el, binding) {
    generateStyle(el, binding);
  },

  // 当指令参数更新时
  updated(el, binding) {
    // 先清理旧样式
    if (el._scrollbarStyle) {
      const { styleElement, uniqueClass } = el._scrollbarStyle;
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
      el.classList.remove(uniqueClass);
    }

    generateStyle(el, binding);
  },

  // 指令与元素解绑时
  unmounted(el: HTMLElement) {
    if (el._scrollbarStyle) {
      const { styleElement, uniqueClass } = el._scrollbarStyle;
      // 移除样式元素
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
      // 移除元素上的类名
      el.classList.remove(uniqueClass);
      // 清除引用
      delete el._scrollbarStyle;
    }
  },
};

// 注册指令
export default customScrollbarDirective;
