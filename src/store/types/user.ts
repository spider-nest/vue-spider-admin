export type UserId = string | number;

export interface RoleInfo {
  roleName: string;
  value: number;
}

export type UserInfo = {
  userId: UserId;
  account: string;
  realName: string;
  avatar: string;
  desc?: string;
  roles: RoleInfo[];
} | null;

export type Token = string | undefined;

export interface UserState {
  userInfo: UserInfo;
  token: Token;
  roles: number[];
}
