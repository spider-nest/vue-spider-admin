import type { App } from "vue";
import type { RouteRecordRaw } from "vue-router";

import { createRouter, createWebHashHistory } from "vue-router";

import { basicRoutes, LoginRoute } from "./routes";
import { REDIRECT_NAME } from "./constant";
import setupRouterGuard from "./guard";

const WHITE_NAME_LIST = [LoginRoute.name, REDIRECT_NAME];

export const router = createRouter({
  history: createWebHashHistory("/"),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function resetRouter() {
  router.getRoutes().map((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export function setupRouter(app: App<Element>) {
  setupRouterGuard(router);
  app.use(router);
}
