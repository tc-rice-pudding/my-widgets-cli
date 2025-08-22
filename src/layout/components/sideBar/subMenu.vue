<template>
  <template v-for="item in menu">
    <el-sub-menu
      v-if="item.children.length > 0 && permission.has(item.permission)"
      :key="item.url"
      :index="item.url"
    >
      <template #title>
        <!-- <el-icon v-if="item.icon" class="font-family">
          <component :is="item.icon" class="font-family" />
        </el-icon> -->
        <i v-if="item.icon" :class="['icon font_family', `${item.icon}`]"> </i>
        <span>{{ item.title }} </span>
      </template>
      <submenu :menu="item.children" />
    </el-sub-menu>
    <el-menu-item
      v-if="item.children.length == 0 && permission.has(item.permission)"
      :key="item.title"
      :index="item.url"
    >
      <i v-if="item.icon" :class="['icon font_family', `${item.icon}`]"> </i>
      <span>{{ item.title }} </span>
    </el-menu-item>
  </template>
</template>
<script lang="ts">
import { PropType, defineComponent } from "vue";
import { MenuItem } from "@/core/interface/menu/index";
import { permission } from "@/directives/has";
// TODO:need fixed, setup 的语法为什么不生效 ？？
// const props = defineProps({
//   menu: {
//     type: Array as PropType<MenuItem[]>,
//     required: true,
//   },
// });

export default defineComponent({
  name: "Submenu",
  props: {
    menu: {
      type: Array as PropType<MenuItem[]>,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      permission,
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
