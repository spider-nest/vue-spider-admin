import type { Menu } from "@/router/types";

import { defineStore } from "pinia";

import { store } from "@/store";

import { useLoadingMessage } from "@/hooks/web/useMessage";

type PermissionCodeList = string[] | number[];

interface PermissionState {
  routeDynamicallyAdded: boolean;
  permissionCodeList: PermissionCodeList;
  menuList: Menu[];
  buildMenuTime: number;
}

export const usePermissionStore = defineStore({
  id: "app-permission",
  state: (): PermissionState => ({
    // 路由是否已经动态添加
    routeDynamicallyAdded: false,
    // 权限识别码列表
    permissionCodeList: [],
    // 菜单列表
    menuList: [],
    // 菜单更新时间
    buildMenuTime: 0,
  }),
  getters: {
    getRouteDynamicallyAdded(): boolean {
      return this.routeDynamicallyAdded;
    },
    getPermissionCodeList(): PermissionCodeList {
      return this.permissionCodeList;
    },
    getMenuList(): Menu[] {
      return this.menuList;
    },
    getBuildMenuTime(): number {
      return this.buildMenuTime;
    },
  },
  actions: {
    setRouteDynamicallyAdded(flag: boolean): void {
      this.routeDynamicallyAdded = flag;
    },
    setPermissionCodeList(permissionCodeList: PermissionCodeList): void {
      this.permissionCodeList = permissionCodeList;
    },
    setMenuList(menuList: Menu[]): void {
      this.menuList = menuList;
      menuList.length > 0 && this.setBuildMenuTime();
    },
    setBuildMenuTime(): void {
      this.buildMenuTime = new Date().getTime();
    },
    resetState(): void {
      this.routeDynamicallyAdded = false;
      this.permissionCodeList = [];
      this.menuList = [];
      this.buildMenuTime = 0;
    },
    async changePermissionCode() {
      // const permissionCodeList = await getPermissionCode();
      this.setPermissionCodeList([]);
    },
    async buildRoutes() {
      useLoadingMessage("菜单加载中");

      // let routes: AppRouteRecordRaw[] = [];
      // let routeList: AppRouteRecordRaw[] = [];

      try {
        this.changePermissionCode();
        // routeList = (await getMenuList()) as AppRouteRecordRaw[];
      } catch (error) {
        console.error(error);
      }

      // 动态引入组件
      // routeList = transformObjToRoute(routeList);

      // 路由转换为菜单结构
      // const menuList = transformRouteToMenu(routeList);
      // this.setMenuList(menuList);

      // 将多级路由转换为二级路由
      // routeList = flatMultipleLevelRoutes(routeList);

      // routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];

      // return routes;
    },
  },
});

// 在 setup 之外使用
export function usePermissionStoreWithout() {
  return usePermissionStore(store);
}
