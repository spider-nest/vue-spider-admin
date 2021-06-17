import type {
  UserPasswordFormModel,
  UserLoginResult,
  UserInfoFormModel,
} from "/@/services/types/system/user";
import type { UserInfo } from "/@/store/types/user";
import type { InfoFeedbackMode } from "/@/utils/axios/types";

import SAxios from "/@/utils/axios";
import { SystemUserApi } from "/@/services/enums/system/user";

export function requestUserLogin(
  params: UserPasswordFormModel,
  infoFeedbackMode: InfoFeedbackMode = "message"
) {
  return SAxios.post<UserLoginResult>(
    {
      url: SystemUserApi.Login,
      params,
    },
    {
      infoFeedbackMode,
    }
  );
}

export function requestUserInfo(params: UserInfoFormModel) {
  return SAxios.get<UserInfo>({
    url: SystemUserApi.Info,
    params,
  });
}

export function requestPermissionCodeList(params: UserInfoFormModel) {
  return SAxios.get<string[]>({
    url: SystemUserApi.CodeList,
    params,
  });
}
