<template>
  <div class="adapt-screen-view" v-scrollbar>
    <section :style="{ '--bg-color': colorHash.hex('第1个action') }">1</section>
    <section :style="{ '--bg-color': colorHash.hex('第2个action') }">2</section>
    <section :style="{ '--bg-color': colorHash.hex('第3个action'), gridArea: 'third' }">3</section>
    <section :style="{ '--bg-color': colorHash.hex('第4个action'), gridArea: 'four' }">4</section>
    <section :style="{ '--bg-color': colorHash.hex('第5个action') }">5</section>
    <section :style="{ '--bg-color': colorHash.hex('第6个action') }">6</section>
    <section :style="{ '--bg-color': colorHash.hex('第7个action') }">7</section>
  </div>
</template>

<script setup lang='ts'>
import ColorHash from "color-hash";
const colorHash = new ColorHash({
  saturation: 0.8,
  lightness: 0.6,
});
</script>

<style scoped lang='scss'>
.adapt-screen-view {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 300px);
  padding-top: 20px;
  gap: 16px;
  grid-template-areas: '. . third' 'four four third' '. . .';

  >section {
    height: 100%;
    background: var(--bg-color);
    color: #fff;
    font-size: 40px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>