import type { UserInfo } from "/#/store";
// import type { InfoFeedbackMode } from "/@/utils/axios/types";

import { defineStore } from "pinia";

import { store } from "/@/store";

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string | undefined;
  roleList: any;
}

const defaultState = {
  userInfo: null,
  token: undefined,
  roleList: [],
};

export const useUserStore = defineStore({
  id: "app-user",
  state: (): UserState => defaultState,
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || ({} as UserInfo);
    },
    getToken(): string | undefined {
      return this.token;
    },
    getRoleList(): any {
      return this.roleList;
    },
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token;
    },
    setRoleList(roleList: any) {
      this.roleList = roleList;
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info;
    },
    resetState() {
      Object.keys(defaultState).map((key) => (this[key] = defaultState[key]));
    },
    async login(params: any): Promise<any> {
      //todo
      return params;
    },
  },
});

// Use outside of setup
export function useUserStoreWithout() {
  return useUserStore(store);
}
