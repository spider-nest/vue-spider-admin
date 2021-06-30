import type { RouteRecordRaw } from "vue-router";

import type { RoleEnum } from "@/enums/roleEnum";

import { defineComponent } from "vue";

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import("*.vue")>)
  | (() => Promise<T>);

// 路由自定义数据
export interface RouteMeta {
  // 标题
  title: string;
  // 是否忽略权限校验
  ignoreAuth?: boolean;
  // 角色信息
  roles?: RoleEnum[];
  // 是否忽略 keep-alive
  ignoreKeepAlive?: boolean;
  // 图标
  icon?: string;
  // 是否在面包屑中隐藏
  hideBreadcrumb?: boolean;
  // 是否隐藏子菜单
  hideChildrenInMenu?: boolean;
  // 是否携带参数
  carryParam?: boolean;
  // 用于标记单层菜单
  single?: boolean;
  // 目前正在使用的菜单
  currentActiveMenu?: string;
  // 是否在菜单中隐藏
  hideMenu?: boolean;
  // 是否是链接
  isLink?: boolean;
}

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}

// 菜单
export interface Menu {
  // 名称
  name: string;
  // 图标
  icon?: string;
  // 路径
  path: string;
  // 是否不可点击
  disabled?: boolean;
  // 子菜单
  children?: Menu[];
  // 角色信息
  roles?: RoleEnum[];
  // 路由自定义数据
  meta?: Partial<RouteMeta>;
  // 是否隐藏菜单
  hideMenu?: boolean;
}
