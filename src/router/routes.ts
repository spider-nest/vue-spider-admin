import type { Menu } from "./types";

import { useLocale } from "/@/hooks";

const { t } = useLocale;

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

export const basicRoutes: Menu[] = [
  {
    path: "/exception-401",
    name: "Exception401",
    component: components.Exception401,
    meta: {
      title: t("routes.exception401"),
    },
  },
  {
    path: "/exception-403",
    name: "Exception403",
    component: components.Exception403,
    meta: {
      title: t("routes.exception403"),
    },
  },
  {
    path: "/exception-404",
    name: "Exception404",
    component: components.Exception404,
    meta: {
      title: t("routes.exception404"),
    },
  },
  {
    path: "/exception-500",
    name: "Exception500",
    component: components.Exception500,
    meta: {
      title: t("routes.exception500"),
    },
  },
  {
    path: "/redirect/:path(.*)",
    name: "Redirect",
    component: components.Redirect,
    meta: {
      title: t("routes.redirect"),
    },
  },
  {
    path: "/human-login",
    name: "HumanLogin",
    component: components.HumanLogin,
    meta: {
      title: t("routes.login"),
    },
  },
  {
    path: "/",
    name: "Index",
    redirect: "/home",
    component: BasicLayout,
  },
];

export const asyncRoutes: Menu[] = [
  {
    path: "/home",
    name: "Home",
    component: components.Home,
    meta: {
      title: t("routes.home"),
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
