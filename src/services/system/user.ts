import type {
  UserPasswordFormModel,
  UserLoginResult,
  UserInfoFormModel,
} from "./types/user";
import type { UserInfo } from "/@/store/types/user";
import type { InfoFeedbackMode } from "/@/utils/axios/types";

import SAxios from "/@/utils/axios";

enum Api {
  Login = "/system/user/login",
  Info = "/system/user/info",
}

export function requestUserLogin(
  params: UserPasswordFormModel,
  infoFeedbackMode: InfoFeedbackMode = "message"
) {
  return SAxios.post<UserLoginResult>(
    {
      url: Api.Login,
      params,
    },
    {
      infoFeedbackMode,
    }
  );
}

export function requestUserInfo(params: UserInfoFormModel) {
  return SAxios.get<UserInfo>({
    url: Api.Info,
    params,
  });
}
