import type { RouteRecordRaw } from "vue-router";

import { defineComponent } from "vue";

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import("*.vue")>)
  | (() => Promise<T>);

export interface RouteMeta {
  icon?: string;
  title: string;
  keepAlive?: boolean;
  link?: string;
  target?: string;
  permissions?: string[] | string;
  roles?: string[] | string | number[] | number;
}

export interface Menu {
  path: string;
  name?: string;
  redirect?: string;
  component?: Component | string;
  icon?: string;
  meta?: Partial<RouteMeta>;
  children?: Menu[];
  childrenVisible?: boolean;
  disabled?: boolean;
  visible?: boolean;
}

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  name?: string;
  meta?: RouteMeta;
  component?: Component | string;
  children?: AppRouteRecordRaw[];
  visible?: boolean;
}

export type AppRouteModule = AppRouteRecordRaw;
