import type { UserId, RoleInfo } from "@/types/store";

export interface UserLoginFormModel {
  // email login
  email?: string;
  password?: string;

  // phone login
  phone?: number;
  code?: string;
}

export interface UserLoginResult {
  userId: UserId;
  token: string;
  roles: RoleInfo[];
}
