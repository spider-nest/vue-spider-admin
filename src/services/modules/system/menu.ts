import type { RequestMenuListResult } from "@/services/types/system/menu";

import SAxios from "@/utils/http/axios";

import { SystemMenuApi } from "@/services/enums/system/menu";

export function requestMenuList() {
  return SAxios.get<RequestMenuListResult>({ url: SystemMenuApi.List });
}
