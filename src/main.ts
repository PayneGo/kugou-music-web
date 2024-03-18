import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import route, { setupRouter } from "./router";

async function bootstarp() {
  const app = createApp(App);
  setupRouter(app);
  await route.isReady();
  app.mount("#app");
}

bootstarp();
