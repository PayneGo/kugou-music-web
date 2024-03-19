import { App } from "vue";
import routes from "./routers";
import { createRouter, createWebHistory } from "vue-router";
import layoutRoutes from "./autoload";

const route = createRouter({
  history: createWebHistory(),
  routes:[...routes, ...layoutRoutes]
});

export function setupRouter(app: App) {
  app.use(route);
}

export default route;
