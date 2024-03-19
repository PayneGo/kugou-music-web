import { RouteRecordRaw } from "vue-router";

const routes = [
    {
      path: "/",
      name: "layout",
      component: () => import("@/layouts/index.vue"),
    },
  ] as RouteRecordRaw[];



export default routes;