import type { MenuListResult } from "/@/services/types/system/menu";

import SAxios from "/@/utils/axios";
import { SystemMenuApi } from "/@/services/enums/system/menu";

export function requestMenuList() {
  return SAxios.get<MenuListResult>({ url: SystemMenuApi.List });
}
