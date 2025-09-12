<template>
    <div class="frame-load-container">
        <div style="height: 600px;"></div>
        <!-- 使用自定义指令 -->
        <div v-frame-load="frameLoadOptions" class="component-wrapper"></div>
    </div>
</template>

<script setup lang="ts">
import Component1 from './components/Component1.vue';
import Component2 from './components/Component2.vue';
import Component3 from './components/Component3.vue';
import Component4 from './components/Component4.vue';
import Component5 from './components/Component5.vue';
import Component6 from './components/Component6.vue';
import Component7 from './components/Component7.vue';
import Component8 from './components/Component8.vue';

const frameLoadOptions = {
    components: [
        Component1,
        Component2,
        Component3,
        Component4,
        Component5,
        Component6,
        Component7,
        Component8,
    ],
    interval: 100, // 每100ms加载一批
    batchSize: 1,  // 每次加载1个组件
    startDelay: 500, // 延迟500ms开始
    observe: true, // 使用IntersectionObserver
    threshold: 0.2 // 当20%元素可见时触发
}
</script>