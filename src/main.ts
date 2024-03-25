import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { createPinia } from 'pinia'
import route, { setupRouter } from "./router";
import { setupNaive } from "@/naive-ui/index";
async function bootstarp() {
  const pinia = createPinia()
  const app = createApp(App);
  setupRouter(app);
  await route.isReady();
  // 初始化组件
  setupNaive(app);
  app.use(pinia)
  // app.use(store)
  app.mount("#app");
}

bootstarp();
