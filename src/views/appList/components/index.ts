export { default as AuthAppDialog } from "./authAppDialog.vue";

// import { reactive } from "vue";
export const tabPatientList = reactive([
  { id: 1, label: "密码登录", domSlot: "pwd" },
  { id: 2, label: "短信登录", domSlot: "message" },
]);
