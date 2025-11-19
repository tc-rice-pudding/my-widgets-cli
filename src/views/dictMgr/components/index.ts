import type { Component, ComponentPublicInstance, Ref } from "vue";

// 原有的模块导入和组件注册逻辑
const modules: Record<string, Component> = import.meta.glob("./*.vue", {
  eager: true,
  import: "default",
});

const components = Object.keys(modules).reduce((acc, path) => {
  const name =
    path
      .split("/")
      .pop()
      ?.replace(/\.vue$/, "") || "";
  acc[name] = modules[path];
  return acc;
}, {} as Record<string, Component>);

// 提取组件类型
type Components = typeof components;

// 创建ref类型工具，将组件类型转换为对应的ref类型
type ComponentRefs<T> = {
  [K in keyof T]: T[K] extends Component
    ? Ref<ComponentPublicInstance<InstanceType<T[K]>>>
    : never;
};

// 生成带类型的组件ref
const compRefs = Object.keys(components).reduce((acc, key) => {
  acc[`${key}Ref`] = ref<ComponentPublicInstance | null>(null);
  return acc;
}, {} as ComponentRefs<Components>);

export default components;
export { compRefs };
