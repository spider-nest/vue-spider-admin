import type { RouteRecordRaw, RouteMeta } from "vue-router";

import { defineComponent } from "vue";

type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import("*.vue")>)
  | (() => Promise<T>);

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  name: string;
  meta: RouteMeta & {
    disabled?: boolean;
    icon?: string;
    extra?: string;
    title?: string;
    hideMenu?: boolean;
  };
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
}

// 菜单
export interface Menu {
  // naive-ui
  key: string | number;
  disabled?: boolean;
  icon?: () => VueNode;
  extra?: string | (() => VueNode);
  label: string | (() => VueNode);

  // 子菜单
  children?: Menu[];
  // 路由自定义数据
  meta?: Partial<RouteMeta>;
  // 名称
  name: string;
  // 是否隐藏
  hideMenu?: boolean;
  // 路径
  path: string;
}
