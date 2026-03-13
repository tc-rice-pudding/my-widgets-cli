/**
 * 核心转换函数：字节转易读单位
 * @param {HTMLElement} el 绑定指令的元素
 * @param {number|string} bytes 原始字节数（支持数字/字符串类型）
 */
function formatSize(el, bytes) {
  // 处理非数字、负数、空值
  const numBytes = Number(bytes);
  // 提前拦截 0/负数/NaN，直接返回 0 B（核心修复）
  if (isNaN(numBytes) || numBytes <= 0) {
    el.textContent = '0 B';
    return;
  }

  // 定义单位和进制（1024 进制）
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  const base = 1024;

  // 计算对应的单位层级
  const level = Math.floor(Math.log(numBytes) / Math.log(base)) || 0;
  // 避免超出单位范围（比如 PB 以上）
  const safeLevel = Math.min(level, units.length - 1);
  // 计算转换后的值（保留 1 位小数，避免 1024.0 KB 这种情况）
  const convertedValue = (numBytes / Math.pow(base, safeLevel)).toFixed(1);
  // 去掉末尾的 .0（比如 10.0 KB → 10 KB）
  const finalValue = convertedValue.replace(/\.0$/, "");

  // 更新元素内容
  el.textContent = `${finalValue} ${units[safeLevel]}`;
}

const formatSizeDirective = {
  // 指令首次绑定到元素时触发
  mounted(el, binding) {
    formatSize(el, binding.value);
  },
  // 指令值更新时触发（响应式数据变化）
  updated(el, binding) {
    formatSize(el, binding.value);
  },
};

export default formatSizeDirective;