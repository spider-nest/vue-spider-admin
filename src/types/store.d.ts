export type UserId = string | number;

export interface UserInfo {
  userId: UserId;
  username: string;
  realName: string;
  avatar: string;
  desc?: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}
