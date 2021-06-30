import SAxios from "@/utils/http/axios";

import { SystemUserApi } from "@/services/enums/system/user";

export function requestPermissionCodeList() {
  return SAxios.get<string[]>({ url: SystemUserApi.CodeList });
}
