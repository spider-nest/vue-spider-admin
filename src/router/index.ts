import type { App } from "vue";
import type { RouteRecordRaw } from "vue-router";

import { createRouter, createWebHashHistory } from "vue-router";

import { basicRoutes, asyncRoutes, rearRoutes } from "./routes";

const generateRoutes = () => {
  return [...basicRoutes, ...asyncRoutes, ...rearRoutes];
};

const router = createRouter({
  history: createWebHashHistory(),
  routes: generateRoutes() as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
