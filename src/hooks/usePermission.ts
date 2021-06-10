import type { RouteRecordRaw } from "vue-router";

import { intersection } from "lodash-es";

import { router, resetRouter } from "/@/router";
import { usePermissionStore } from "/@/store/modules/permission";
import { isArray } from "/@/utils/is";

export function usePermission() {
  const permissionStore = usePermissionStore();

  function hasPermission(value?: string | string[], flag = true): boolean {
    if (!value) {
      return flag;
    }
    const permissionCodeList = permissionStore.getPermissionCodeList;
    if (!isArray(value)) {
      return permissionCodeList.includes(value);
    }
    return intersection(value, permissionCodeList).length > 0;
  }

  async function refreshMenu() {
    resetRouter();
    const routes = await permissionStore.generateRoutes();
    routes.map((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });
  }

  return { hasPermission, refreshMenu };
}
