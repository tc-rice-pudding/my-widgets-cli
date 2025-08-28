import type { Directive, DirectiveBinding } from "vue";

interface WatermarkOptions {
  text?: string | string[]; // 水印文字
  font?: string; // 字体样式
  color?: string; // 字体颜色
  opacity?: number; // 透明度
  angle?: number; // 旋转角度
  gap?: [number, number]; // 水印间距 [水平, 垂直]
}

const vWatermark: Directive<HTMLElement, WatermarkOptions | string> = {
  mounted(el, binding) {
    createWatermark(el, binding);
  },
  updated(el, binding) {
    createWatermark(el, binding);
  },
};

function createWatermark(
  el: HTMLElement,
  binding: DirectiveBinding<WatermarkOptions | string>
) {
  // 清除现有水印
  const existingWatermark = el.querySelector(".vue-watermark");
  if (existingWatermark) {
    el.removeChild(existingWatermark);
  }

  const options: WatermarkOptions =
    typeof binding.value === "string"
      ? { text: binding.value }
      : binding.value || {};

  const {
    text = "Watermark",
    font = "16px Microsoft YaHei",
    color = "rgba(128, 128, 128, 0.7)",
    opacity = 0.4,
    angle = -20,
    gap = [0, 10],
  } = options;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // 测量文本宽度
  ctx.font = font;
  const texts = Array.isArray(text) ? text : [text];
  let maxWidth = 0;
  texts.forEach((t) => {
    const metrics = ctx.measureText(t);
    maxWidth = Math.max(maxWidth, metrics.width);
  });

  const canvasSize = Math.max(maxWidth, 200) * 1.5;
  canvas.width = canvasSize + gap[0];
  canvas.height = canvasSize * texts.length + gap[1];

  // 绘制水印
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;
  ctx.rotate((angle * Math.PI) / 180);

  texts.forEach((t, i) => {
    ctx.fillText(t, 0, (i + 1) * (canvasSize / texts.length));
  });

  // 创建水印背景
  const watermark = document.createElement("div");
  watermark.className = "vue-watermark";
  watermark.style.position = "absolute";
  watermark.style.top = "0";
  watermark.style.left = "0";
  watermark.style.width = "100%";
  watermark.style.height = "100%";
  watermark.style.pointerEvents = "none";
  watermark.style.backgroundImage = `url(${canvas.toDataURL()})`;
  watermark.style.backgroundRepeat = "repeat";

  el.style.position = "relative";
  el.appendChild(watermark);
}

export default vWatermark;
