import type { RouteRecordRaw } from "vue-router";

import { defineComponent } from "vue";

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import("*.vue")>)
  | (() => Promise<T>);

export interface RouteMeta {
  title: string;
  ignoreAuth?: boolean;
  icon?: string;
  isLink?: boolean;
  roles?: string[] | number[];
  hideChildrenInMenu?: boolean;
  hideMenu?: boolean;
  frameSrc?: string;
  transitionName?: string;
  hideBreadcrumb?: boolean;
  single?: boolean;
}

export interface Menu {
  name: string;
  icon?: string;
  path: string;
  disabled?: boolean;
  children?: Menu[];
  roles?: string[] | number[];
  redirect?: string;
  meta?: Partial<RouteMeta>;
  hideMenu?: boolean;
}

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
}

export type AppRouteModule = AppRouteRecordRaw;
