import type { UserInfo } from "@/types/store";
import type {
  UserLoginFormModel,
  UserLoginResult,
} from "@/services/types/system/user";

import { SystemUserApi } from "@/services/enums/system/user";

import SAxios from "@/utils/http/axios";
import { pickByValid } from "@/utils/object";

export function requestUserLogin(formModel: UserLoginFormModel) {
  const params = pickByValid(formModel, ["email", "password", "phone", "code"]);

  return SAxios.post<UserLoginResult>({
    url: SystemUserApi.Login,
    params,
  });
}

export function requestUserInfo() {
  return SAxios.get<UserInfo>({
    url: SystemUserApi.Info,
  });
}

export function requestPermissionCodeList() {
  return SAxios.get<string[]>({ url: SystemUserApi.CodeList });
}
