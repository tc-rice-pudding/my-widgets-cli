import type { Directive, DirectiveBinding } from "vue";

/**
 * 查找 elementUI 的 input 组件
 * @param el 
 * @returns 
 */
const findInputEl = (el: HTMLElement) => {
  if (el.nodeName == "INPUT") {
    el.focus();
    return;
  }
  for (const key in el.childNodes) {
    const currEl = el.childNodes[key];
    findInputEl(currEl as HTMLElement);
  }
};

const vFocus: Directive = {
  mounted(el: HTMLElement) {
    el.nodeName == "INPUT" ? el.focus() : findInputEl(el);
  },
  updated(el: HTMLElement, binding: DirectiveBinding<boolean>) {
    if (binding.value) {
      el.focus();
    }
  },
};

export default vFocus;
