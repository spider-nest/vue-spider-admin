import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";

const dashboard: AppRouteModule = {
  path: "/dashboard",
  name: "Dashboard",
  component: LAYOUT,
  redirect: "/dashboard/analysis",
  meta: {
    icon: "ion:grid-outline",
    title: "routes.dashboard",
  },
  children: [
    {
      path: "analysis",
      name: "Analysis",
      component: () => import("/@/views/dashboard/analysis/index.vue"),
      meta: {
        title: "routes.analysis",
      },
    },
    {
      path: "workbench",
      name: "Workbench",
      component: () => import("/@/views/dashboard/workbench/index.vue"),
      meta: {
        title: "routes.workbench",
      },
    },
  ],
};

export default dashboard;
