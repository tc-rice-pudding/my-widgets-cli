import { DirectiveBinding, ObjectDirective, Component, createApp } from "vue";

interface FrameLoadOptions {
  components: Component[]; // 需要按帧加载的组件数组
  interval?: number; // 每帧间隔时间(ms)，默认16ms(约60fps)
  batchSize?: number; // 每批加载的组件数量，默认1
  startDelay?: number; // 开始延迟(ms)，默认0
  reverse?: boolean; // 是否反向加载，默认false
  observe?: boolean; // 是否使用IntersectionObserver，默认true
  threshold?: number; // IntersectionObserver的阈值，默认0.1
}

interface FrameLoadElement extends HTMLElement {
  _frameLoad?: {
    cleanup: () => void;
    loaded: boolean;
    observer?: IntersectionObserver;
  };
}

const FrameLoad: ObjectDirective<FrameLoadElement> = {
  mounted(el: FrameLoadElement, binding: DirectiveBinding<FrameLoadOptions>) {
    const options: FrameLoadOptions = {
      interval: 16,
      batchSize: 1,
      startDelay: 0,
      reverse: false,
      observe: true,
      threshold: 0.1,
      ...binding.value,
    };

    if (!options.components || options.components.length === 0) {
      console.warn("v-frame-load: No components provided");
      return;
    }

    // 创建容器用于挂载组件
    const container = document.createElement("div");
    el.appendChild(container);

    let lastRequestId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const loadComponents = () => {
      if (el._frameLoad?.loaded) return;

      const components = options.reverse
        ? [...options.components].reverse()
        : options.components;

      let loadedCount = 0;
      const total = components.length;

      const loadNextBatch = () => {
        if (loadedCount >= total) {
          if (el._frameLoad) el._frameLoad.loaded = true;
          return;
        }

        const batchEnd = Math.min(
          loadedCount + (options.batchSize || 1),
          total
        );

        // 使用 requestAnimationFrame 确保在渲染前执行
        lastRequestId = requestAnimationFrame(() => {
          // 创建并挂载当前批次的组件
          for (let i = loadedCount; i < batchEnd; i++) {
            const component = components[i];
            const app = createApp(component);
            const instance = app.mount(document.createElement("div"));
            container.appendChild(instance.$el);
          }

          loadedCount = batchEnd;

          // 使用 setTimeout 控制批次间隔
          timeoutId = setTimeout(() => {
            lastRequestId = requestAnimationFrame(loadNextBatch);
          }, options.interval);
        });
      };

      // 初始延迟
      timeoutId = setTimeout(() => {
        lastRequestId = requestAnimationFrame(loadNextBatch);
      }, options.startDelay);
    };

    const cleanup = () => {
      if (lastRequestId) cancelAnimationFrame(lastRequestId);
      if (timeoutId) clearTimeout(timeoutId);
      if (el._frameLoad?.observer) el._frameLoad.observer.disconnect();

      // 清空容器
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      el.removeChild(container);
    };

    // 初始化状态
    el._frameLoad = {
      cleanup,
      loaded: false,
    };

    if (options.observe) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadComponents();
              observer.unobserve(el);
              if (el._frameLoad) el._frameLoad.observer = undefined;
            }
          });
        },
        { threshold: options.threshold }
      );

      observer.observe(el);
      el._frameLoad.observer = observer;
    } else {
      loadComponents();
    }
  },

  unmounted(el: FrameLoadElement) {
    if (el._frameLoad) {
      el._frameLoad.cleanup();
      delete el._frameLoad;
    }
  },
};

export default FrameLoad;
