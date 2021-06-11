import type { AppRouteRecordRaw, AppRouteModule } from "/@/router/types";

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from "/@/router/routes/basic";
import { PageEnum } from "/@/enums/page";
import { isArray } from "/@/utils/is";

const modules = import.meta.globEager("./modules/**/*.ts");
const routeModules: AppRouteModule[] = [];

Object.keys(modules).map((module) => {
  const item = modules[module].default || {};
  routeModules.push(...(isArray(item) ? [...item] : [item]));
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModules];

export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME_PATH,
  meta: {
    title: "Root",
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: "/human-login",
  name: "HumanLogin",
  component: () => import("/@/views/human/login.vue"),
  meta: {
    title: "routes.login",
  },
};

export const basicRoutes = [LoginRoute, RootRoute, REDIRECT_ROUTE];
