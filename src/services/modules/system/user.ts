import type { UserInfo } from "@/types/store";
import type {
  UserLoginFormModel,
  UserLoginResult,
  UserListFormModel,
} from "@/services/types/system/user";

import { SystemUserApi } from "@/services/enums/system/user";

import defaultHttp from "@/utils/http/axios";
import { pickByValid } from "@/utils/object";

export function requestUserLogin(formModel: UserLoginFormModel) {
  const params = pickByValid(formModel, ["email", "password", "phone", "code"]);

  return defaultHttp.post<UserLoginResult>({
    url: SystemUserApi.Login,
    params,
  });
}

export function requestUserList(formModel: UserListFormModel) {
  const params = pickByValid(formModel, ["page", "pageSize", "id", "realName"]);

  return defaultHttp.get<UserInfo[]>({
    url: SystemUserApi.List,
    params,
  });
}

export function requestUserInfo() {
  return defaultHttp.get<UserInfo>({
    url: SystemUserApi.Info,
  });
}

export function requestPermissionCodeList() {
  return defaultHttp.get<string[]>({ url: SystemUserApi.CodeList });
}
