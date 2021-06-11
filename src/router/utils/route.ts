import type { Router, RouteRecordNormalized } from "vue-router";

import type { AppRouteModule, AppRouteRecordRaw } from "/@/router/types";

import { createRouter, createWebHashHistory } from "vue-router";
import { cloneDeep, omit } from "lodash-es";

import { BasicLayout, getGroupLayout } from "/@/router/routes";
import { sWarn } from "/@/utils/console";

type LayoutMapKey = "LAYOUT";

const LayoutMap = new Map<String, () => Promise<typeof import("*.vue")>>();

LayoutMap.set("LAYOUT", BasicLayout);

let dynamicViewsModules: Record<string, () => Promise<Recordable>>;

function dynamicImport(
  dynamicViewsModules: Record<string, () => Promise<Recordable>>,
  component: string
) {
  const keys = Object.keys(dynamicViewsModules);
  const matchKeys = keys.filter((key) => {
    let k = key.replace("../../views", "");
    k = k.substring(0, k.lastIndexOf("."));
    return k === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicViewsModules[matchKey];
  }
  if (matchKeys?.length > 1) {
    sWarn(
      "Please do not create `.vue` and `.TSX` files with the same filename in the same hierarchical directory under the views folder. This will cause the dynamic introduction to fail"
    );
    return;
  }
}

function asyncImportRoute(routes: AppRouteRecordRaw[] | undefined) {
  dynamicViewsModules =
    dynamicViewsModules || import.meta.glob("../../views/**/*.{vue,tsx}");
  if (!routes) return;
  routes.map((route) => {
    const { component, name, children } = route;
    if (component) {
      route.component =
        LayoutMap.get(component as string) ??
        dynamicImport(dynamicViewsModules, component as string);
    } else if (name) {
      route.component = getGroupLayout();
    }
    children && asyncImportRoute(children);
  });
}

export function transformComponent<T = AppRouteModule>(
  routes: AppRouteModule[]
): T[] {
  routes.map((route) => {
    if (route.component) {
      if ((route.component as string).toUpperCase() === "LAYOUT") {
        route.component = LayoutMap.get(
          (route.component as string).toUpperCase() as LayoutMapKey
        );
      } else {
        route.children = [cloneDeep(route)];
        route.component = BasicLayout;
        route.name = `${route.name}Group`;
        route.path = "";
      }
    }
    route.children && asyncImportRoute(route.children);
  });

  return routes as unknown as T[];
}

function addToChildren(
  routes: RouteRecordNormalized[],
  children: AppRouteRecordRaw[],
  routeModule: AppRouteModule
) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    const route = routes.find((item) => item.name === child.name);
    if (!route) {
      continue;
    }
    routeModule.children = routeModule.children || [];
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route as unknown as AppRouteModule);
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule);
    }
  }
}

function promoteRouteLevel(routeModule: AppRouteModule) {
  let router: Router | null = createRouter({
    routes: [routeModule as unknown as RouteRecordNormalized],
    history: createWebHashHistory(),
  });

  const routes = router.getRoutes();
  addToChildren(routes, routeModule.children || [], routeModule);
  router = null;

  routeModule.children = routeModule.children?.map((item) =>
    omit(item, "children")
  );
}

export function flatRoutes(routeModules: AppRouteModule[]) {
  const modules: AppRouteModule[] = cloneDeep(routeModules);
  for (let index = 0; index < modules.length; index++) {
    const routeModule = modules[index];
    if (!isMultipleRoute(routeModule)) {
      continue;
    }
    promoteRouteLevel(routeModule);
  }
  return modules;
}

function isMultipleRoute(routeModule: AppRouteModule) {
  if (
    !routeModule ||
    !Reflect.has(routeModule, "children") ||
    !routeModule.children?.length
  ) {
    return false;
  }

  const children = routeModule.children;

  let flag = false;
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    if (child.children?.length) {
      flag = true;
      break;
    }
  }
  return flag;
}
