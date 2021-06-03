import type { AppRouteRecordRaw, Menu } from "/@/router/types";

import type { PermissionState } from "/@/store/types/permission";

import { defineStore } from "pinia";

import { store } from "/@/store";
import { useUserStore } from "/@/store/modules/user";
import { useI18n } from "/@/hooks/useLocale";
import { useInfoFeedback } from "/@/hooks/useInfoFeedback";
import { basicRoutes, rearRoutes } from "/@/router/routes";
import { requestPermissionCodeList } from "/@/services/system/user";
import { requestMenuList } from "/@/services/system/menu";
import { sError } from "/@/utils/console";
import { transformComponent, flatRoutes } from "/@/router/utils/route";
import { transformMenu } from "/@/router/utils/menu";

export const userPermissionStore = defineStore({
  id: "app-permission",
  state: (): PermissionState => ({
    permissionCodeLists: [],
    menuLists: [],
  }),
  getters: {
    getPermissionCodeList(): string[] {
      return this.permissionCodeLists;
    },
    getMenuList(): Menu[] {
      return this.menuLists;
    },
  },
  actions: {
    setPermissionCodeList(permissionCodeList: string[]) {
      this.permissionCodeLists = permissionCodeList;
    },
    setMenuList(list: Menu[]) {
      this.menuLists = list;
    },
    resetState() {
      this.setPermissionCodeList([]);
      this.setMenuList([]);
    },
    async changePermissionCode() {
      const userStore = useUserStore();
      const userId = userStore.getUserInfo?.userId;
      if (userId) {
        const permissionCodeList = await requestPermissionCodeList({ userId });
        this.setPermissionCodeList(permissionCodeList);
      }
    },
    async generateRoutes(): Promise<AppRouteRecordRaw[]> {
      const { t } = useI18n();
      const { SMessage } = useInfoFeedback();
      SMessage.loading({
        content: t("overall.loading"),
      });

      const routes: AppRouteRecordRaw[] = [...basicRoutes];
      let routeList: AppRouteRecordRaw[] = [];
      try {
        this.changePermissionCode();
        routeList = (await requestMenuList()) as AppRouteRecordRaw[];
      } catch (error) {
        sError(error);
      }

      routeList = transformComponent(routeList);

      const menuList = transformMenu(routeList);
      this.setMenuList(menuList);

      routeList = flatRoutes(routeList);
      routes.push(...routeList, ...rearRoutes);
      return routes;
    },
  },
});

// Use outside of setup
export function userPermissionStoreWithout() {
  return userPermissionStore(store);
}
