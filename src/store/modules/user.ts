import type { UserInfo, UserState, Token } from "/@/store/types/user";
import type {
  UserPasswordFormModel,
  UserInfoFormModel,
} from "/@/services/system/types/user";
import type { InfoFeedbackMode } from "/@/utils/axios/types";

import { defineStore } from "pinia";

import { store } from "/@/store";
import router from "/@/router";
import { requestUserLogin, requestUserInfo } from "/@/services/system/user";
import { PageEnum } from "/@/enums/page";

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
      return this.userInfo;
    },
    getToken(): Token {
      return this.token;
    },
    getRoleList(): string[] {
      return this.roles;
    },
  },
  actions: {
    setToken(token: Token) {
      this.token = token;
    },
    setRoleList(roles: string[]) {
      this.roles = roles;
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info;
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

        const userInfo = await this.getUserInfo({ userId });
        routeToHome && (await router.replace(PageEnum.BASE_HOME_PATH));
        return userInfo;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getUserInfo({ userId }: UserInfoFormModel) {
      const userInfo = await requestUserInfo({ userId });
      const { roles } = userInfo;
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
