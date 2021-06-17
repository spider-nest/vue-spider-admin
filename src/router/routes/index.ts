import type { AppRouteRecordRaw } from "/@/router/types";

import { REDIRECT_ROUTE } from "/@/router/routes/basic";
import { PageEnum } from "/@/enums/page";

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
