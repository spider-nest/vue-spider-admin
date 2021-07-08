import type { requestParams } from "../_util";

import { MockMethod } from "vite-plugin-mock";

import { SystemMenuApi } from "../../services/enums/system/menu";
import {
  apiPrefix,
  failureResult,
  successfulResult,
  getRequestToken,
} from "../_util";
import { createUserList } from "./user";

const dashboardRoute = {
  path: "/dashboard",
  name: "DashboardAnalysis",
  component: "/dashboard/analysis/Index",
  meta: {
    icon: "",
    title: "分析页",
  },
};

const systemRoute = {
  path: "/system",
  name: "System",
  component: "LAYOUT",
  redirect: "/system/account",
  meta: {
    icon: "",
    title: "系统管理",
  },
  children: [
    {
      path: "account",
      name: "SystemAccount",
      component: "/system/account/Index",
      meta: {
        title: "账号管理",
      },
    },
    {
      path: "role",
      name: "SystemRole",
      component: "/system/role/Index",
      meta: {
        title: "角色管理",
      },
    },
    {
      path: "menu",
      name: "SystemMenu",
      component: "/system/menu/Index",
      meta: {
        title: "菜单管理",
      },
    },
    {
      path: "department",
      name: "SystemDepartment",
      component: "/system/department/Index",
      meta: {
        title: "部门管理",
      },
    },
  ],
};

export default [
  {
    url: `${apiPrefix}${SystemMenuApi.List}`,
    timeout: 200,
    method: "get",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return failureResult("token 无效");
      }

      const user = createUserList().find((item) => item.token === token);
      if (!user) {
        return failureResult("用户无效");
      }

      if (user.userId === 999) {
        return successfulResult([dashboardRoute, systemRoute]);
      } else if (user.userId === 1000) {
        return successfulResult([dashboardRoute]);
      }
    },
  },
] as MockMethod[];
