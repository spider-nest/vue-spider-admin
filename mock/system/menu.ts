import type { requestParams } from "../_util";

import { MockMethod } from "vite-plugin-mock";

import { getEnvConfig } from "/@/utils/env";
import { Api } from "/@/services/system/menu";
import { failureResult, successfulResult, getRequestToken } from "../_util";
import { createUserList } from "./user";

const { VITE_API_PREFIX } = getEnvConfig();

const dashboardRoute = {
  path: "/dashboard",
  name: "Dashboard",
  component: "/dashboard/analysis/index.vue",
  meta: {
    title: "routes.analysis",
    icon: "bx:bx-home",
  },
};

const systemRoute = {
  path: "/system",
  name: "System",
  component: "LAYOUT",
  redirect: "/system/account",
  meta: {
    icon: "ion:settings-outline",
  },
  children: [
    {
      path: "account",
      name: "AccountManagement",
      component: "/system/account/index.vue",
    },
    {
      path: "role",
      name: "RoleManagement",
      component: "/system/role/index.vue",
    },
    {
      path: "menu",
      name: "MenuManagement",
      component: "/system/menu/index.vue",
    },
    {
      path: "department",
      name: "DepartmentManagement",
      component: "/system/dept/index.vue",
    },
  ],
};

export default [
  {
    url: `${VITE_API_PREFIX}${Api.List}`,
    timeout: 200,
    method: "get",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return failureResult("Invalid token");
      }

      const user = createUserList().find((item) => item.token === token);
      if (!user) {
        return failureResult("Invalid user");
      }

      if (user.userId === 999) {
        return successfulResult([dashboardRoute, systemRoute]);
      } else if (user.userId === 1000) {
        return successfulResult([dashboardRoute]);
      }
    },
  },
] as MockMethod[];
