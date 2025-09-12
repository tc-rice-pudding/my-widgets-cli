<template>
  <div class="infinite-scroll-example">
    <div class="list-container">
      <template v-for="(item, index) in items" :key="item.id">
        <div class="list-item" v-infinite-scroll="infiniteScrollOptions" v-if="index == items.length - 1">
          {{ item.content }}
        </div>
        <div v-else class="list-item">
          {{ item.content }}
        </div>
      </template>
    </div>

    <!-- 加载状态指示器 -->
    <div v-if="loading" class="loading">加载中...</div>

    <!-- 没有更多数据的提示 -->
    <div v-if="!hasMore && items.length > 0" class="no-more">已经到底啦~</div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref } from "vue";

// 定义列表项类型
interface ListItem {
  id: number;
  content: string;
}

// 列表数据
const items = ref<ListItem[]>([]);
// 加载状态
const loading = ref(false);
// 是否还有更多数据
const hasMore = ref(true);
// 当前页码
const currentPage = ref(1);
// 每页数量
const pageSize = 10;

// 模拟加载数据
const fetchData = async (page: number, size: number): Promise<ListItem[]> => {
  // 模拟网络请求延迟
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 生成模拟数据
  const newItems: ListItem[] = [];
  for (let i = 0; i < size; i++) {
    const id = (page - 1) * size + i + 1;
    newItems.push({
      id,
      content: `列表项 ${id}`,
    });
  }
  ElMessage.success('获取数据成功...');

  // 模拟只有5页数据
  if (page >= 5) {
    return [];
  }

  return newItems;
};

// 加载更多数据的方法
const loadMore = async () => {
  const newItems = await fetchData(currentPage.value, pageSize);

  if (newItems.length > 0) {
    items.value = [...items.value, ...newItems];
    currentPage.value++;
  } else {
    // 没有更多数据了
    hasMore.value = false;
  }
};

// 初始化加载第一页数据
loadMore();

// 无限滚动指令的配置选项
const infiniteScrollOptions = {
  loadMore,
  dataSource: items,
  loading,
  hasMore,
  threshold: 50, // 距离底部50px时触发加载
};
</script>

<style scoped>
.list-container {
  max-width: 600px;
  margin: 0 auto;
}

.list-item {
  padding: 16px;
  margin: 8px 0;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #fff;
}

.loading {
  text-align: center;
  padding: 16px;
  color: #666;
}

.no-more {
  text-align: center;
  padding: 16px;
  color: #999;
}
</style>
