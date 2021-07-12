import type { RouteRecordRaw } from "vue-router";

import type { RoleEnum } from "@/enums/roleEnum";

import { intersection } from "lodash-es";

import { router, resetRouter } from "@/router";

import { usePermissionStore } from "@/store/modules/permission";

import { useLoadingMessage } from "@/hooks/web/useMessage";

import { isArray } from "@/utils/is";

export function usePermission() {
  const permissionStore = usePermissionStore();

  // 重置并重新获得授权信息
  async function resume() {
    const messageReactive = useLoadingMessage("菜单加载中", { duration: 0 });

    resetRouter();

    const routes = await permissionStore.buildRoutes();
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });

    permissionStore.setBuildMenuTime();

    setTimeout(() => messageReactive?.destroy(), 1300);
  }

  // 确定是否有权限
  function hasPermission(
    value?: RoleEnum | RoleEnum[] | string | string[],
    defaultReturn = true
  ): boolean {
    if (!value) {
      return defaultReturn;
    }
    const permissionCodeList =
      permissionStore.getPermissionCodeList as string[];
    if (!isArray(value)) {
      return permissionCodeList.includes(value);
    }
    return intersection(value, permissionCodeList).length > 0;
  }

  // 刷新菜单
  async function refreshMenu() {
    await resume();
  }

  return { hasPermission, refreshMenu };
}
