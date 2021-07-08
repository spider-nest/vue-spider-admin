import type { RequestMenuListResult } from "@/services/types/system/menu";

import defaultHttp from "@/utils/http/axios";

import { SystemMenuApi } from "@/services/enums/system/menu";

export function requestMenuList() {
  return defaultHttp.get<RequestMenuListResult>({ url: SystemMenuApi.List });
}
