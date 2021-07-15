import type { AppRouteRecordRaw, Menu } from "@/router/types";

import { defineStore } from "pinia";

import { store } from "@/store";

import { PAGE_NOT_FOUND_ROUTE } from "@/router/routes/basic";

import { requestPermissionCodeList } from "@/services/modules/system/user";
import { requestMenuList } from "@/services/modules/system/menu";

import {
  transformObjToRoute,
  flatMultipleLevelRoutes,
} from "@/router/helper/routeHelper";
import { transformRouteToMenu } from "@/router/helper/menuHelper";

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
    setBuildMenuTime(time?: number): void {
      this.buildMenuTime = time ?? new Date().getTime();
    },
    resetState(): void {
      this.setRouteDynamicallyAdded(false);
      this.setPermissionCodeList([]);
      this.setMenuList([]);
      this.setBuildMenuTime(0);
    },
    async changePermissionCode() {
      const permissionCodeList = await requestPermissionCodeList();
      this.setPermissionCodeList(permissionCodeList);
    },
    async buildRoutes(): Promise<AppRouteRecordRaw[]> {
      let routes: AppRouteRecordRaw[] = [];
      let routeList: AppRouteRecordRaw[] = [];

      try {
        this.changePermissionCode();
        routeList = (await requestMenuList()) as AppRouteRecordRaw[];
      } catch (error) {
        console.error(error);
      }

      // 动态引入组件
      routeList = transformObjToRoute(routeList);

      // 路由转换为菜单结构
      const menuList = transformRouteToMenu(routeList);
      this.setMenuList(menuList);

      // 将多级路由转换为二级路由
      routeList = flatMultipleLevelRoutes(routeList);

      routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];

      return routes;
    },
  },
});

// 在 setup 之外使用
export function usePermissionStoreWithout() {
  return usePermissionStore(store);
}
