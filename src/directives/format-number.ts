import type { Directive, DirectiveBinding } from "vue";

/**
 * 格式化数字（支持纯数字/带单位数字）为千分位格式
 * @param value 待格式化的值（数字/字符串）
 * @returns 格式化后的字符串
 */
const formatNumberWithUnit = (value: number | string): string => {
  // 空值直接返回
  if (value === null || value === undefined || value === "") return "";

  // 转为字符串处理
  const valueStr = String(value).trim();

  // 正则匹配：数字部分（整数/小数） + 单位部分（非数字字符）
  const reg = /^(\d+\.?\d*)(.*)$/;
  const match = valueStr.match(reg);

  // 匹配失败则返回原始值
  if (!match) return valueStr;

  const [, numStr, unit] = match;
  // 确保数字部分能正确转换，非数字则返回原始值
  const num = Number(numStr);
  if (isNaN(num)) return valueStr;

  // 格式化数字为千分位
  const formattedNum = num.toLocaleString("en-US");

  // 拼接数字和单位返回
  return `${formattedNum}${unit}`;
};

/**
 * Vue3 全局自定义指令：v-format-number
 * 功能：仅格式化普通元素的文本内容为千分位（支持带单位）
 */
const formatNumberDirective: Directive = {
  /**
   * 元素挂载时执行格式化
   * @param el 绑定的普通DOM元素
   * @param binding 指令绑定对象
   */
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // 仅处理普通元素的文本内容
    el.textContent = formatNumberWithUnit(el.textContent || "");
  },

  /**
   * 元素更新时重新格式化
   */
  updated(el: HTMLElement) {
    el.textContent = formatNumberWithUnit(el.textContent || "");
  },
};

export default formatNumberDirective;
