import type { AppRouteModule, AppRouteRecordRaw, Menu } from "/@/router/types";

import { cloneDeep } from "lodash-es";

import { treeMap } from "/@/utils/tree";
import { isUrl } from "/@/utils/is";

function joinParentPath(menus: Menu[], parentPath = "") {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index];
    if (!(menu.path.startsWith("/") || isUrl(menu.path))) {
      menu.path = `${parentPath}/${menu.path}`;
    }
    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.path);
    }
  }
}

export function transformMenu(routeModuleList: AppRouteModule[]) {
  const routeModuleLists = cloneDeep(routeModuleList);
  const routeList: AppRouteRecordRaw[] = [];

  routeModuleLists.map((item) => {
    if (item.meta?.single) {
      const realItem = item?.children?.[0];
      realItem && routeList.push(realItem);
    } else {
      routeList.push(item);
    }
  });

  const list = treeMap(routeList, {
    conversion: (route: AppRouteRecordRaw) => {
      const { meta: { title, hideMenu = false } = {} } = route;

      return {
        ...(route.meta || {}),
        meta: route.meta,
        name: title,
        hideMenu,
        path: route.path,
      };
    },
  });

  joinParentPath(list as Menu[]);

  return cloneDeep(list);
}
