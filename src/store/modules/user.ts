import type { UserInfo } from "@/types/store";
import type { RoleEnum } from "@/enums/roleEnum";

import { defineStore } from "pinia";

import { store } from "@/store";

import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from "@/enums/cacheEnum";

import { getAuthCache, setAuthCache } from "@/utils/auth";

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
}

export const useUserStore = defineStore({
  id: "app-user",
  state: (): UserState => ({
    // 用户信息
    userInfo: null,
    // 用户令牌
    token: undefined,
    // 角色信息
    roleList: [],
    // 登入是否超时
    sessionTimeout: false,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0
        ? this.roleList
        : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
  },
  actions: {
    setUserInfo(userInfo: UserInfo): void {
      this.userInfo = userInfo;
      setAuthCache(USER_INFO_KEY, userInfo);
    },
    setToken(token: string | undefined): void {
      this.token = token;
      setAuthCache(TOKEN_KEY, token);
    },
    setRoleList(roleList: RoleEnum[]): void {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setSessionTimeout(flag: boolean): void {
      this.sessionTimeout = flag;
    },
    resetState(): void {
      this.userInfo = null;
      this.token = "";
      this.roleList = [];
      this.sessionTimeout = false;
    },
  },
});

// 在 setup 之外使用
export function useUserStoreWithout() {
  return useUserStore(store);
}
