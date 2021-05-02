import type { App } from "vue";
import type { RouteRecordRaw } from "vue-router";

import { createRouter, createWebHashHistory } from "vue-router";

import {
  basicRoutes,
  asyncRoutes,
  rearRoutes,
  RedirectMenu,
  HumanLoginMenu,
} from "./routes";

const WHITE_NAME_LIST = [HumanLoginMenu.name, RedirectMenu.name];

const generateRoutes = () => {
  return [...basicRoutes, ...asyncRoutes, ...rearRoutes];
};

const router = createRouter({
  history: createWebHashHistory(
    import.meta.env.VITE_PUBLIC_PATH as string | undefined
  ),
  routes: generateRoutes() as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export default router;
