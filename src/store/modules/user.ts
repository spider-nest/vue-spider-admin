import type { UserLoginFormModel } from "@/services/types/system/user";
import type { UserInfo } from "@/types/store";
import type { RoleEnum } from "@/enums/roleEnum";

import { defineStore } from "pinia";

import { store } from "@/store";
import { router } from "@/router";

import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from "@/enums/cacheEnum";
import { PageEnum } from "@/enums/pageEnum";

import { getAuthCache, setAuthCache } from "@/utils/auth";

import { useSuccessMessage } from "@/hooks/web/useMessage";
import {
  requestUserLogin,
  requestUserInfo,
} from "@/services/modules/system/user";

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
    setUserInfo(userInfo: Nullable<UserInfo>): void {
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
      this.setUserInfo(null);
      this.setToken(undefined);
      this.setRoleList([]);
      this.setSessionTimeout(false);
    },
    async logout(): Promise<void> {
      this.resetState();
      window.location.href = PageEnum.BASE_LOGIN;
    },
    async handleUserInfo() {
      const userInfo = await requestUserInfo();
      const { roles } = userInfo;
      const roleList = roles.map((item) => item.value) as RoleEnum[];

      this.setUserInfo(userInfo);
      this.setRoleList(roleList);

      return userInfo;
    },
    async handleUserLogin(
      formModel: UserLoginFormModel,
      successMessage?: string
    ): Promise<Nullable<UserInfo>> {
      try {
        const loginResult = await requestUserLogin(formModel);
        const { token } = loginResult;
        this.setToken(token);

        const userInfo = await this.handleUserInfo();

        await router.replace(PageEnum.BASE_HOME);

        useSuccessMessage(successMessage);

        return userInfo;
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    },
  },
});

// 在 setup 之外使用
export function useUserStoreWithout() {
  return useUserStore(store);
}
