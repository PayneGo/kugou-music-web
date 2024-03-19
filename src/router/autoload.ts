import { RouteRecordRaw } from "vue-router";

const layouts = import.meta.glob("../layouts/*.vue");
const views = import.meta.glob("../views/**/*.vue");

function getRoutes() {
  const layoutRoutes = [] as RouteRecordRaw[];

  Object.entries(layouts).forEach(([file, module]) => {
    const route = getRouteByModule(file, module);
    const childRoutes = getChildRouteByModule(route);
    layoutRoutes.push(route);
    layoutRoutes.push(...childRoutes);
  });

  return layoutRoutes;
}

function getChildRouteByModule(layoutRoute: RouteRecordRaw) {
  const childRoutes = [] as RouteRecordRaw[];

  Object.entries(views).forEach(([file, module]) => {
    if (file.includes(`../views/${layoutRoute.name as string}`)) {
      const route = getRouteByModule(file, module);
      childRoutes.push(route);
    }
  });

  return childRoutes;
}

function getRouteByModule(file: string, module: { [key: string]: any }) {
  // 正则表达式去除文件路径中的 layouts 和 views 文件夹
  const name = file.replace(/^..\/(layouts|views)\/(.*)\.vue$/, "$2");
  const route = {
    path: `/${name}`,
    name: name.replace("/", "-"),
    component: module.default,
  } as RouteRecordRaw;

  return route;
}

export default getRoutes();
