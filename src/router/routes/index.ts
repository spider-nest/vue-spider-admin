import type { AppRouteRecordRaw } from "@/router/types";

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from "@/router/routes/basic";

import { PageEnum } from "@/enums/pageEnum";

const modules = import.meta.globEager("./modules/**/*.ts");

const routeModuleList: AppRouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: "Root",
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: PageEnum.BASE_LOGIN,
  name: "Login",
  component: () => import("@/pages/login/Index.vue"),
  meta: {
    title: "登入",
  },
};

// 不需要权限控制的路由
export const basicRoutes = [LoginRoute, RootRoute, REDIRECT_ROUTE];
