import type { AppRouteRecordRaw, Menu } from "@/router/types";

import { cloneDeep } from "lodash-es";

import { treeMap } from "@/utils/helper/treeHelper";
import { isUrl } from "@/utils/is";

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

export function transformRouteToMenu(routeModList: AppRouteRecordRaw[]) {
  const cloneRouteModList = cloneDeep(routeModList);
  const routeList: AppRouteRecordRaw[] = [];

  cloneRouteModList.forEach((item) => {
    if (item.meta?.single) {
      const realItem = item?.children?.[0];
      realItem && routeList.push(realItem);
    } else {
      routeList.push(item);
    }
  });

  const list = treeMap(routeList, {
    conversion: (node: AppRouteRecordRaw) => {
      const { meta: { title, hideMenu = false } = {} } = node;

      return {
        ...(node.meta || {}),
        meta: node.meta,
        name: title,
        hideMenu,
        path: node.path,
      };
    },
  });

  joinParentPath(list);

  return cloneDeep(list);
}
