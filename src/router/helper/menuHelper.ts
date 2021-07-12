import type { AppRouteRecordRaw, Menu } from "@/router/types";

import { h } from "vue";
import { cloneDeep } from "lodash-es";

import { SIcon } from "@/components";

import { treeMap } from "@/utils/helper/treeHelper";
import { isUrl } from "@/utils/is";

function joinParentPath(menus: Menu[], parentPath = "") {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index];
    if (!(menu.path.startsWith("/") || isUrl(menu.path))) {
      const path = `${parentPath}/${menu.path}`;
      menu.key = path;
      menu.path = path;
    } else {
      menu.key = menu.path;
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
      const {
        meta: { disabled = false, icon, extra, title, hideMenu = false } = {},
      } = node;

      return {
        disabled,
        icon: icon ? () => h(SIcon as any, { name: icon }) : null,
        extra,
        label: title,
        hideMenu,
        path: node.path,
      };
    },
  }) as Menu[];

  joinParentPath(list);

  return cloneDeep(list);
}
