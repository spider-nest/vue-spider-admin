import { RoleInfo, UserId } from "/@/store/types/user";

export interface UserPasswordFormModel {
  account: string;
  password: string;
}

export interface UserInfoFormModel {
  userId: UserId;
}

export interface UserLoginResult {
  userId: UserId;
  token: string;
  role: RoleInfo;
}
