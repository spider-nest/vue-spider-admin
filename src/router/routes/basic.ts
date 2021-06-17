import type { AppRouteRecordRaw } from "/@/router/types";

import { REDIRECT_NAME, LAYOUT, EXCEPTION_COMPONENT } from "/@/router/constant";

export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: "/:path(.*)*",
  name: "ErrorPage",
  component: LAYOUT,
  meta: {
    title: "routes.errorPage",
  },
  children: [
    {
      path: "/:path(.*)*",
      name: "ErrorPage",
      component: EXCEPTION_COMPONENT,
      meta: {
        title: "routes.errorPage",
      },
    },
  ],
};

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: "/redirect",
  name: REDIRECT_NAME,
  component: LAYOUT,
  meta: {
    title: REDIRECT_NAME,
  },
  children: [
    {
      path: "/redirect/:path(.*)",
      name: REDIRECT_NAME,
      component: () => import("/@/views/redirect.vue"),
      meta: {
        title: REDIRECT_NAME,
      },
    },
  ],
};
