import type { AppRouteRecordRaw, Menu } from "@/router/types";

import { RouterLink } from "vue-router";
import { cloneDeep } from "lodash-es";

import { SIcon } from "@/components";

import { treeMap } from "@/utils/helper/treeHelper";
import { isUrl } from "@/utils/is";

function joinParentPath(menus: Menu[], parentPath = "") {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index];
    const { path, children, label } = menu;

    if (!(path.startsWith("/") || isUrl(path))) {
      const realPath = `${parentPath}/${path}`;
      menu.key = realPath;
      menu.path = realPath;
    } else {
      menu.key = path;
    }

    if (children?.length) {
      joinParentPath(children, menu.path);
    } else {
      menu.label = () => <RouterLink to={menu.path}>{label}</RouterLink>;
    }
  }
}

export function transformRouteToMenu(routeModList: AppRouteRecordRaw[]) {
  const cloneRouteModList = cloneDeep(routeModList);
  const routeList: AppRouteRecordRaw[] = [];

  cloneRouteModList.forEach((item) => {
    if (item.meta?.hideMenu !== true) {
      if (item.meta?.single) {
        const realItem = item?.children?.[0];
        realItem && routeList.push(realItem);
      } else {
        routeList.push(item);
      }
    }
  });

  const list = treeMap(routeList, {
    conversion: (node: AppRouteRecordRaw) => {
      const menu: Recordable = {};

      const {
        meta: { disabled = false, icon, extra, title, hideMenu = false } = {},
        path,
      } = node;

      menu.disabled = disabled;
      menu.icon = icon ? () => <SIcon name={icon} /> : null;
      menu.extra = extra;
      menu.label = title;
      menu.name = title;
      menu.hideMenu = hideMenu;
      menu.path = path;

      return menu;
    },
  }) as Menu[];

  joinParentPath(list);

  return cloneDeep(list);
}
