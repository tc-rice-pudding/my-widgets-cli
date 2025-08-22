<template>
  <div ref="wordCloudContainer" class="word-cloud-container" />
</template>

<script setup lang="ts">
import ColorHash from "color-hash";
import * as d3 from 'd3';
import cloud from 'd3-cloud';

interface Word {
  text: string;
  size: number;
}
const wordCloudContainer = ref<HTMLElement | null>(null);

const wordList = ref<Word[]>([
  { text: 'Vue', size: 40 },
  { text: 'TypeScript', size: 35 },
  { text: 'D3.js', size: 30 },
  { text: 'Vite', size: 25 },
  { text: 'JavaScript', size: 50 },
  { text: 'React', size: 20 },
]);
const colorHash = new ColorHash({
  saturation: 0.8,
  lightness: 0.6,
});

const init = () => {
  if (!wordCloudContainer.value) return;

  const width = wordCloudContainer.value.clientWidth;
  const height = wordCloudContainer.value.clientHeight;

  // 初始化词云布局（直接使用导入的 cloud）
  const layout = cloud()
    .size([width, height])
    .words(wordList.value.map(d => ({ text: d.text, size: d.size })))
    .padding(5)
    .rotate(() => 0)
    .font('Arial')
    .fontSize(d => d.size)
    .on('end', draw);

  layout.start();


  // 绘制词云
  function draw(words: Word[]) {
    const svg = d3
      .select(wordCloudContainer.value)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    svg
      .selectAll('text')
      .data(words)
      .enter()
      .append('text')
      .style('font-size', d => `${d.size}px`)
      .style('font-family', 'Arial')
      .style('font-weight', d => `${d.size * 100 + 400} `)
      .style('fill', d => colorHash.hex(d.text) || '#000')
      .attr('text-anchor', 'middle')
      .attr('transform', (d: any) => `translate(${[d.x, d.y]})`)
      .text(d => d.text);
  }
}

onMounted(() => {
  init();
});
</script>

<style scoped lang="scss">
.word-cloud-container {
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
  margin: 0 auto;
}
</style>