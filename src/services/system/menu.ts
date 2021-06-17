import type { MenuListResult } from "./types/menu";

import SAxios from "/@/utils/axios";

export enum Api {
  List = "/system/menu/list",
}

export function requestMenuList() {
  return SAxios.get<MenuListResult>({ url: Api.List });
}
