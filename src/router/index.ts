import type { App } from "vue";
import type { RouteRecordRaw } from "vue-router";

import { createRouter, createWebHashHistory } from "vue-router";

import { REDIRECT_NAME } from "./constant";
import { basicRoutes, LoginRoute } from "./routes";
import { getEnvConfig } from "/@/utils/env";

const WHITE_NAME_LIST = [LoginRoute.name, REDIRECT_NAME];
const { VITE_PUBLIC_PATH } = getEnvConfig();

export const router = createRouter({
  history: createWebHashHistory(VITE_PUBLIC_PATH),
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
  app.use(router);
}
