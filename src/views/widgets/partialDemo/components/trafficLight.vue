<template>
  <div class="traffic-light">
    <div class="light red" :class="{ active: currentState === 'red' }"></div>
    <div class="light yellow" :class="{ active: currentState === 'yellow' }"></div>
    <div class="light green" :class="{ active: currentState === 'green' }"></div>
    <div class="controls">
      <button @click="stop">停止</button>
      <button @click="start">启动</button>
    </div>
    <p>当前状态: {{ currentState }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

// 这个例子中：
// 状态：red (红)、yellow (黄)、green (绿)
// 事件：timeout (时间到)
// 转换规则：red → green → yellow → red
// 每个状态有明确的持续时间
// 定义可能的状态
type TrafficLightState = 'red' | 'yellow' | 'green';

// 定义状态机配置
const transitions = {
  red: {
    timeout: (): TrafficLightState => 'green' // 红灯时间到，转为绿灯
  },
  green: {
    timeout: (): TrafficLightState => 'yellow' // 绿灯时间到，转为黄灯
  },
  yellow: {
    timeout: (): TrafficLightState => 'red' // 黄灯时间到，转为红灯
  }
};

// 状态持续时间
const stateDurations = {
  red: 5000,
  yellow: 2000,
  green: 5000
};

// 当前状态
const currentState = ref<TrafficLightState>('red');
let timer: number | null = null;

// 触发状态转换
function transition(event: 'timeout') {
  const nextState = transitions[currentState.value][event];
  if (nextState) {
    currentState.value = nextState();
    startTimer();
  }
}

// 启动定时器
function startTimer() {
  if (timer) clearTimeout(timer);

  timer = window.setTimeout(() => {
    transition('timeout');
  }, stateDurations[currentState.value]);
}

// 控制方法
function start() {
  startTimer();
}

function stop() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

// 组件卸载时清理定时器
onUnmounted(() => {
  if (timer) clearTimeout(timer);
});

// 初始启动
start();
</script>

<style scoped>
.traffic-light {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
}

.light {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.light.red {
  background-color: red;
}

.light.yellow {
  background-color: yellow;
}

.light.green {
  background-color: green;
}

.light.active {
  opacity: 1;
  box-shadow: 0 0 15px currentColor;
}

.controls {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
