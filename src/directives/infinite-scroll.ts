import { DirectiveBinding, Ref } from "vue";

// 定义指令的选项类型
interface InfiniteScrollOptions {
  // 加载数据的回调函数
  loadMore: () => Promise<void>;
  // 列表数据的引用
  dataSource: Ref<any[]>;
  // 加载状态的引用
  loading: Ref<boolean>;
  // 是否还有更多数据
  hasMore: Ref<boolean>;
  // 触发加载的阈值(像素)
  threshold?: number;
}

// 存储每个元素的观察者实例
const observerMap = new WeakMap<Element, IntersectionObserver>();

// 自定义无限滚动指令
export const vInfiniteScroll = {
  mounted(el: Element, binding: DirectiveBinding<InfiniteScrollOptions>) {
    const {
      loadMore,
      dataSource,
      loading,
      hasMore,
      threshold = 100,
    } = binding.value;

    const observer = new IntersectionObserver(
      async (entries) => {
        // 检查最后一个元素是否可见，并且不在加载中，且还有更多数据
        if (
          entries[0].isIntersecting &&
          !loading.value &&
          hasMore.value &&
          dataSource.value.length > 0
        ) {
          // 标记为加载中
          loading.value = true;

          try {
            await loadMore();
          } catch (error) {
            console.error("加载数据失败:", error);
          } finally {
            loading.value = false;
          }
        }
      },
      {
        rootMargin: `0px 0px ${threshold}px 0px`,
      }
    );

    // 存储观察者实例，便于后续清理
    observerMap.set(el, observer);

    // 观察最后一个元素
    observer.observe(el);
  },

  updated(el: Element, binding: DirectiveBinding<InfiniteScrollOptions>) {
    const { dataSource, hasMore } = binding.value;
    const observer = observerMap.get(el);

    if (observer) {
      // 如果没有更多数据了，停止观察
      if (!hasMore.value) {
        observer.unobserve(el);
        return;
      }

      // 如果数据有更新，重新观察最后一个元素
      // 先停止观察旧元素
      observer.unobserve(el);
      // 再观察更新后的元素
      observer.observe(el);
    }
  },

  // 卸载绑定元素的父组件时调用
  unmounted(el: Element) {
    const observer = observerMap.get(el);
    if (observer) {
      // 停止观察并清理
      observer.unobserve(el);
      observerMap.delete(el);
    }
  },
};

export default vInfiniteScroll;
