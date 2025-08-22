import { defineStore } from "pinia";

export const useCondition = defineStore("condition", {
  state: () => ({
    conditions: [] as string[],
  }),
  actions: {
    addCondition(keyword) {
      if (!this.conditions.includes(keyword)) {
        this.conditions.push(keyword);
      }
    },
    clearCondition() {
      this.conditions.splice(0, this.conditions.length);
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "condition", //自定义 Key值
        paths: ["conditions"],
        storage: localStorage, // 选择存储方式
      },
    ],
  },
});
