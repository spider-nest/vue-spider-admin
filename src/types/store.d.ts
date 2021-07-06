export type UserId = string | number;

export interface RoleInfo {
  roleName: string;
  value: string;
}

export interface UserInfo {
  userId: UserId;
  username: string;
  realName: string;
  avatar: string;
  roles: RoleInfo[];
  desc?: string;
}
