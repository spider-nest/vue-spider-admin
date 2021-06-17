import type { requestParams } from "../_util";

import { MockMethod } from "vite-plugin-mock";

import { SystemMenuApi } from "../../src/services/enums/system/menu";
import {
  getEnvConfig,
  failureResult,
  successfulResult,
  getRequestToken,
} from "../_util";
import { createUserList } from "./user";

const { VITE_API_PREFIX } = getEnvConfig();

const dashboardRoute = {
  path: "/dashboard",
  name: "Dashboard",
  component: "LAYOUT",
  redirect: "/dashboard/analysis",
  meta: {
    icon: "bx:bx-home",
  },
  children: [
    {
      path: "analysis",
      name: "DashboardAnalysis",
      component: "/dashboard/analysis/index",
      meta: {
        title: "routes.analysis",
      },
    },
    {
      path: "workbench",
      name: "DashboardWorkbench",
      component: "/dashboard/workbench/index",
      meta: {
        title: "routes.workbench",
      },
    },
  ],
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
      name: "SystemAccount",
      component: "/system/account/index",
    },
    {
      path: "role",
      name: "SystemRole",
      component: "/system/role/index",
    },
    {
      path: "menu",
      name: "SystemMenu",
      component: "/system/menu/index",
    },
    {
      path: "department",
      name: "SystemDepartment",
      component: "/system/department/index",
    },
  ],
};

export default [
  {
    url: `${VITE_API_PREFIX}${SystemMenuApi.List}`,
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
