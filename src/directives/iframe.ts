import type { Directive, DirectiveBinding } from "vue";

interface IframeOptions {
  src: string;
  width?: string;
  height?: string;
  loading?: "eager" | "lazy";
  sandbox?: string[];
  allow?: string[];
  onLoad?: (iframe: HTMLIFrameElement) => void;
  onError?: (error: string | Event) => void;
}

interface IframeElement extends HTMLElement {
  _iframe?: HTMLIFrameElement;
  _iframeResizeObserver?: ResizeObserver;
}

const vIframe: Directive<IframeElement, string | IframeOptions> = {
  mounted(el, binding) {
    createIframe(el, binding);
  },
  updated(el, binding) {
    createIframe(el, binding);
  },
  unmounted(el) {
    cleanupIframe(el);
  },
};

function createIframe(
  el: IframeElement,
  binding: DirectiveBinding<string | IframeOptions>
) {
  // 清理现有 iframe
  cleanupIframe(el);

  // 解析配置
  const options: IframeOptions =
    typeof binding.value === "string" ? { src: binding.value } : binding.value;

  if (!options.src) {
    console.error("v-iframe: src is required");
    return;
  }

  // 创建 iframe 元素
  const iframe = document.createElement("iframe");
  iframe.src = options.src;
  iframe.width = options.width || "100%";
  iframe.height = options.height || "100%";
  iframe.style.border = "none";
  iframe.loading = options.loading || "lazy";

  // 设置安全沙箱属性
  if (options.sandbox) {
    iframe.sandbox.add(...options.sandbox);
  } else {
    // 默认沙箱限制
    iframe.sandbox.add("allow-same-origin", "allow-scripts", "allow-popups");
  }

  // 设置允许权限
  if (options.allow) {
    iframe.allow = options.allow.join("; ");
  }

  // 事件处理
  iframe.onload = () => {
    options.onLoad?.(iframe);
    // setupAutoHeight(el, iframe);
  };

  iframe.onerror = (error) => {
    options.onError?.(error);
    console.error("v-iframe: Failed to load", options.src, error);
  };

  el._iframe = iframe;
  el.appendChild(iframe);
}

function setupAutoHeight(el: IframeElement, iframe: HTMLIFrameElement) {
  try {
    // 尝试自动调整高度
    const resizeObserver = new ResizeObserver(() => {
      if (iframe.contentWindow?.document?.body) {
        iframe.style.height = `${iframe.contentWindow.document.body.scrollHeight}px`;
      }
    });

    resizeObserver.observe(iframe);
    el._iframeResizeObserver = resizeObserver;
  } catch (error) {
    console.warn(
      "v-iframe: Auto height adjustment failed due to cross-origin restrictions"
    );
  }
}

function cleanupIframe(el: IframeElement) {
  if (el._iframe) {
    el.removeChild(el._iframe);
    delete el._iframe;
  }

  if (el._iframeResizeObserver) {
    el._iframeResizeObserver.disconnect();
    delete el._iframeResizeObserver;
  }
}

export default vIframe;
