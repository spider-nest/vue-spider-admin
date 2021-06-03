import type { RouteMeta } from "/@/router/types";

export interface RouteItem {
  path: string;
  component: string;
  meta: RouteMeta;
  name?: string;
  redirect?: string;
  children?: RouteItem[];
}

export type MenuListResult = RouteItem[];
