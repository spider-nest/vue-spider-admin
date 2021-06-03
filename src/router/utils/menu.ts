import type { AppRouteModule, AppRouteRecordRaw, Menu } from "/@/router/types";

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

export function transformMenu(routeList: AppRouteModule[]) {
  const list = treeMap(routeList, {
    conversion: (route: AppRouteRecordRaw) => {
      const { meta: { title } = {}, visible = true } = route;

      return {
        path: route.path,
        name: title,
        meta: route.meta,
        visible,
      };
    },
  }) as Menu[];

  joinParentPath(list);

  return list;
}
