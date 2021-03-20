import type { App } from "vue";
import type { RouteRecordRaw } from "vue-router";

import { createRouter, createWebHistory } from "vue-router";
import { basicRoutes } from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes: (basicRoutes as unknown) as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
