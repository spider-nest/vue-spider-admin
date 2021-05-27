import type { AppConfig } from "/#/config";
import type { BeforeRestoreInfo } from "/#/store";
import type { ThemeEnum } from "/@/enums/app";

import { defineStore } from "pinia";

import { store } from "/@/store";
import { darkMode } from "/@/settings/style";
import { resetRouter } from "/@/router";
import { deepMerge } from "/@/utils";

interface AppState {
  darkMode?: ThemeEnum;
  pageLoading: boolean;
  config: AppConfig | null;
  beforeRestoreInfo: BeforeRestoreInfo;
}

let timeId: TimeoutHandle;

export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    config: null,
    beforeRestoreInfo: {},
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getDarkMode(): string {
      return this.darkMode || darkMode;
    },
    getBeforeRestoreInfo(): BeforeRestoreInfo {
      return this.beforeRestoreInfo;
    },
    getAppConfig(): AppConfig {
      return this.config || ({} as AppConfig);
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode;
    },
    setBeforeRestoreInfo(state: BeforeRestoreInfo): void {
      this.beforeRestoreInfo = state;
    },
    setAppConfig(config: DeepPartial<AppConfig>): void {
      this.config = deepMerge(this.config || {}, config);
    },
    async resetAllState() {
      resetRouter();
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
  },
});

// Use outside of setup
export function useAppStoreWithout() {
  return useAppStore(store);
}
