import "@/assets/iconfont/iconfont.css";
import { registerDirectives } from "@/directives";
import * as Components from "@/global-components/index";
import * as EleIcons from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import { createApp } from "vue";
import App from "./App.vue";
import "./permission";
import router from "./router";
// 引入注册脚本
const app = createApp(App);
registerDirectives(app);
Object.entries(Components).forEach(([key, component]: any) => {
  app.component(key, component);
});
Object.keys(EleIcons).forEach((key: any) => {
  app.component(key, EleIcons[key]);
});
const pinia = createPinia();
pinia.use(piniaPersist);
app
  .use(ElementPlus, {
    size: "default",
  })
  .use(router)
  .use(pinia)
  .mount("#app");
