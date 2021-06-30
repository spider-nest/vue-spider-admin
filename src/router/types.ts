import type { RouteRecordRaw, RouteMeta } from "vue-router";

import type { RoleEnum } from "@/enums/roleEnum";

import { defineComponent } from "vue";

type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import("*.vue")>)
  | (() => Promise<T>);

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
