import type { UserInfo, UserState, Token } from "/@/store/types/user";
import type {
  UserPasswordFormModel,
  UserInfoFormModel,
} from "/@/services/types/system/user";
import type { InfoFeedbackMode } from "/@/utils/axios/types";

import { defineStore } from "pinia";

import { store } from "/@/store";
import { router } from "/@/router";
import {
  requestUserLogin,
  requestUserInfo,
} from "/@/services/modules/system/user";
import { PageEnum } from "/@/enums/page";
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from "/@/enums/cache";
import { getAuthCache, setAuthCache } from "/@/utils/auth";

const defaultState = {
  userInfo: null,
  token: undefined,
  roles: [],
};

export const useUserStore = defineStore({
  id: "app-user",
  state: (): UserState => defaultState,
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY);
    },
    getToken(): Token {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRoleList(): number[] {
      return this.roles.length > 0
        ? this.roles
        : getAuthCache<number[]>(ROLES_KEY);
    },
  },
  actions: {
    setToken(token: Token) {
      this.token = token;
      setAuthCache(TOKEN_KEY, token);
    },
    setRoleList(roles: number[]) {
      this.roles = roles;
      setAuthCache(ROLES_KEY, roles);
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info;
      setAuthCache(USER_INFO_KEY, info);
    },
    resetState() {
      Object.keys(defaultState).map((key) => (this[key] = defaultState[key]));
    },
    async passwordLogin(
      params: UserPasswordFormModel & {
        routeToHome?: boolean;
        infoFeedbackMode?: InfoFeedbackMode;
      }
    ): Promise<UserInfo> {
      try {
        const {
          routeToHome = true,
          infoFeedbackMode,
          ...UserPasswordFormModel
        } = params;
        const userLogin = await requestUserLogin(
          UserPasswordFormModel,
          infoFeedbackMode
        );
        const { token, userId } = userLogin;
        this.setToken(token);

        const userInfo = await this.getUserInfoAction({ userId });
        routeToHome && (await router.replace(PageEnum.BASE_HOME_PATH));
        return Promise.resolve(userInfo);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getUserInfoAction({ userId }: UserInfoFormModel) {
      const userInfo = await requestUserInfo({ userId });
      const roles = userInfo?.roles || [];
      const roleList = roles.map((item) => item.value);

      this.setUserInfo(userInfo);
      this.setRoleList(roleList);

      return userInfo;
    },
    logout(routeToLogin = true) {
      routeToLogin && router.push(PageEnum.BASE_LOGIN_PATH);
    },
  },
});

// Use outside of setup
export function useUserStoreWithout() {
  return useUserStore(store);
}
