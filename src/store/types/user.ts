export type UserId = string | number;

export type UserInfo = {
  userId: UserId;
  account: string;
  realName: string;
  avatar: string;
  desc?: string;
} | null;

export type Token = string | undefined;

export interface RoleInfo {
  roleName: string;
  value: number;
}

export interface UserState {
  userInfo: UserInfo;
  token: Token;
  roles: string[];
}
