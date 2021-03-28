import type { App } from "vue";
import type { RouteRecordRaw } from "vue-router";

import { createRouter, createWebHistory } from "vue-router";
import { basicRoutes, asyncRoutes, rearRoutes } from "./routes";

const generateRoutes = () => {
  return [...basicRoutes]
    .map((basicRoute) => {
      if (basicRoute.name === "Index") {
        basicRoute.children = asyncRoutes;
      }

      return basicRoute;
    })
    .concat([...rearRoutes]);
};

const router = createRouter({
  history: createWebHistory(),
  routes: generateRoutes() as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
