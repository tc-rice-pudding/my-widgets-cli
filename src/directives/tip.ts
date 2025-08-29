import tippy, { Instance, Props } from "tippy.js";
import "tippy.js/dist/tippy.css";
import { DirectiveBinding, ObjectDirective } from "vue";

// 定义指令值的类型
interface TippyDirectiveValue {
  content: string; // 提示内容
  options?: Partial<Props>; // Tippy.js 配置选项
  isEnabled?: boolean; // 是否启用提示
}

// 存储 Tippy 实例的 WeakMap
const tippyInstances = new WeakMap<HTMLElement, Instance>();

const tip: ObjectDirective<HTMLElement, TippyDirectiveValue | string> = {
  mounted(el, binding) {
    setTimeout(() => {
      initTippy(el, binding);
    }, 300);
  },

  updated(el, binding) {
    const instance = tippyInstances.get(el);
    if (!instance) return;

    // 获取标准化后的配置
    const {
      content,
      options = {},
      isEnabled,
    }: TippyDirectiveValue = typeof binding.value === "string"
      ? { content: binding.value }
      : binding.value;

    // 更新内容
    if (instance.props.content !== content) {
      instance.setContent(content);
    }

    // 更新启用状态
    if (isEnabled !== undefined) {
      isEnabled ? instance.enable() : instance.disable();
    }

    // 更新其他选项
    instance.setProps(options || {});
  },

  unmounted(el) {
    const instance = tippyInstances.get(el);
    if (instance) {
      instance.destroy();
      tippyInstances.delete(el);
    }
  },
};

// 初始化 Tippy 实例
function initTippy(
  el: HTMLElement,
  binding: DirectiveBinding<TippyDirectiveValue | string>
) {
  const {
    content,
    options = {},
    isEnabled,
  }: TippyDirectiveValue = typeof binding.value === "string"
    ? { content: binding.value }
    : binding.value;
  debugger;
  console.log("---Initializing Tippy.js with content:---", el);

  // 创建 Tippy 实例
  const instance = tippy(el, {
    content,
    ...options,
    onHidden(instance) {
      // 修复 Vue 3 的 teleport 与 Tippy 的冲突
      if (instance.popper.firstChild) {
        document.body.appendChild(instance.popper);
      }
    },
  });

  // 设置初始启用状态
  if (isEnabled !== undefined) {
    isEnabled ? instance.enable() : instance.disable();
  }

  // 存储实例
  tippyInstances.set(el, instance);
}

export default tip;
