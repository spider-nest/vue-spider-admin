import type { Menu } from "./types";

import { PageEnum } from "/@/enums/page";
import { qt } from "/@/hooks/useLocale";

const BasicLayout = () => import("/@/layouts/basic.vue");

const components = {
  Exception401: () => import("/@/views/exception/401.vue"),
  Exception403: () => import("/@/views/exception/403.vue"),
  Exception404: () => import("/@/views/exception/404.vue"),
  Exception500: () => import("/@/views/exception/500.vue"),
  Redirect: () => import("/@/views/redirect.vue"),
  HumanLogin: () => import("/@/views/human/login.vue"),
  Home: () => import("/@/views/home.vue"),
};

export const RedirectMenu = {
  path: "/redirect/:path(.*)",
  name: "Redirect",
  component: components.Redirect,
  meta: {
    title: qt("routes.redirect"),
  },
};

export const HumanLoginMenu = {
  path: PageEnum.BASE_LOGIN_PATH,
  name: "HumanLogin",
  component: components.HumanLogin,
  meta: {
    title: qt("routes.login"),
  },
};

export const basicRoutes: Menu[] = [
  {
    path: "/exception-401",
    name: "Exception401",
    component: components.Exception401,
    meta: {
      title: qt("routes.exception401"),
    },
  },
  {
    path: "/exception-403",
    name: "Exception403",
    component: components.Exception403,
    meta: {
      title: qt("routes.exception403"),
    },
  },
  {
    path: "/exception-404",
    name: "Exception404",
    component: components.Exception404,
    meta: {
      title: qt("routes.exception404"),
    },
  },
  {
    path: "/exception-500",
    name: "Exception500",
    component: components.Exception500,
    meta: {
      title: qt("routes.exception500"),
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

export const asyncRoutes: Menu[] = [
  {
    path: PageEnum.BASE_HOME_PATH,
    name: "Home",
    component: components.Home,
    meta: {
      title: qt("routes.home"),
    },
  },
];

export const rearRoutes: Menu[] = [
  {
    path: "/:path(.*)*",
    redirect: "/exception-404",
    visible: false,
  },
];
