import type { AppRouteRecordRaw } from "./types";

import { PageEnum } from "/@/enums/page";

export const BasicLayout = () => import("/@/layouts/basic.vue");

export const getGroupLayout = () => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: "GroupLayout",
      });
    });
};

const components = {
  Exception401: () => import("/@/views/exception/401.vue"),
  Exception403: () => import("/@/views/exception/403.vue"),
  Exception404: () => import("/@/views/exception/404.vue"),
  Exception500: () => import("/@/views/exception/500.vue"),
  Redirect: () => import("/@/views/redirect.vue"),
  HumanLogin: () => import("/@/views/human/login.vue"),
  Home: () => import("/@/views/home.vue"),
};

export const Exception404Menu = {
  path: "/exception-404",
  name: "Exception404",
  component: components.Exception404,
  meta: {
    title: "routes.exception404",
  },
};

export const RedirectMenu = {
  path: "/redirect/:path(.*)",
  name: "Redirect",
  component: components.Redirect,
  meta: {
    title: "routes.redirect",
  },
};

export const HumanLoginMenu = {
  path: PageEnum.BASE_LOGIN_PATH,
  name: "HumanLogin",
  component: components.HumanLogin,
  meta: {
    title: "routes.login",
  },
};

export const basicRoutes: AppRouteRecordRaw[] = [
  {
    path: "/exception-401",
    name: "Exception401",
    component: components.Exception401,
    meta: {
      title: "routes.exception401",
    },
  },
  {
    path: "/exception-403",
    name: "Exception403",
    component: components.Exception403,
    meta: {
      title: "routes.exception403",
    },
  },
  Exception404Menu,
  {
    path: "/exception-500",
    name: "Exception500",
    component: components.Exception500,
    meta: {
      title: "routes.exception500",
    },
  },
  RedirectMenu,
  HumanLoginMenu,
  {
    path: "/",
    name: "Index",
    redirect: "/home",
    component: BasicLayout,
  },
];

export const asyncRoutes: AppRouteRecordRaw[] = [
  {
    path: PageEnum.BASE_HOME_PATH,
    name: "Home",
    component: components.Home,
    meta: {
      title: "routes.home",
    },
  },
];

export const rearRoutes: AppRouteRecordRaw[] = [
  {
    path: "/:path(.*)*",
    redirect: "/exception-404",
    visible: false,
  },
];
