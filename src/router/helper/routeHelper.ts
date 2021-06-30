import type { Router, RouteRecordNormalized } from "vue-router";

import type { AppRouteRecordRaw } from "@/router/types";

import { createRouter, createWebHashHistory } from "vue-router";
import { cloneDeep, omit } from "lodash-es";

import { getParentLayout, LAYOUT } from "@/router/constant";

const LayoutMap = new Map<string, () => Promise<typeof import("*.vue")>>();

LayoutMap.set("LAYOUT", LAYOUT);

let dynamicViewsModules: Record<string, () => Promise<Recordable>>;

function dynamicImport(
  dynamicViewsModules: Record<string, () => Promise<Recordable>>,
  component: string
) {
  const keys = Object.keys(dynamicViewsModules);
  const matchKeys = keys.filter((key) => {
    let k = key.replace("../../pages", "");
    const lastIndex = k.lastIndexOf(".");
    k = k.substring(0, lastIndex);
    return k === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicViewsModules[matchKey];
  }
  if (matchKeys?.length > 1) {
    console.error(
      "请不要在 pages 文件夹下的同一层目录中创建具有相同文件名的 .vue 和 .tsx 文件，这将导致动态引入失败"
    );
    return;
  }
}

function asyncImportRoute(routes: AppRouteRecordRaw[] | undefined) {
  dynamicViewsModules =
    dynamicViewsModules || import.meta.glob("../../pages/**/*.{vue,tsx}");
  if (!routes) return;
  routes.forEach((item) => {
    const { component, name } = item;
    const { children } = item;
    if (component) {
      const layoutFound = LayoutMap.get(component as string);
      if (layoutFound) {
        item.component = layoutFound;
      } else {
        item.component = dynamicImport(
          dynamicViewsModules,
          component as string
        );
      }
    } else if (name) {
      item.component = getParentLayout();
    }
    children && asyncImportRoute(children);
  });
}

export function transformObjToRoute<T = AppRouteRecordRaw>(
  routeList: AppRouteRecordRaw[]
): T[] {
  routeList.forEach((route) => {
    const component = route.component as string;
    if (component) {
      if (component.toUpperCase() === "LAYOUT") {
        route.component = LayoutMap.get(component.toUpperCase());
      } else {
        route.children = [cloneDeep(route)];
        route.component = LAYOUT;
        route.name = `${route.name}Parent`;
        route.path = "";
        const meta = route.meta || {};
        meta.single = true;
        route.meta = meta;
      }
    }
    route.children && asyncImportRoute(route.children);
  });
  return routeList as unknown as T[];
}

function isMultipleRoute(routeModule: AppRouteRecordRaw) {
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

function addToChildren(
  routes: RouteRecordNormalized[],
  children: AppRouteRecordRaw[],
  routeModule: AppRouteRecordRaw
) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    const route = routes.find((item) => item.name === child.name);
    if (!route) {
      continue;
    }
    routeModule.children = routeModule.children || [];
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route as unknown as AppRouteRecordRaw);
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule);
    }
  }
}

function promoteRouteLevel(routeModule: AppRouteRecordRaw) {
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

export function flatMultipleLevelRoutes(routeModules: AppRouteRecordRaw[]) {
  const modules: AppRouteRecordRaw[] = cloneDeep(routeModules);
  for (let index = 0; index < modules.length; index++) {
    const routeModule = modules[index];
    if (!isMultipleRoute(routeModule)) {
      continue;
    }
    promoteRouteLevel(routeModule);
  }
  return modules;
}
