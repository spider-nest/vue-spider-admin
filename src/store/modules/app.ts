import type { AppConfig, MenuSetting, TransitionSetting } from "/#/config";
import type { BeforeRestoreInfo, AppState } from "/@/store/types/app";
import type { ThemeEnum } from "/@/enums/app";

import { defineStore } from "pinia";

import { store } from "/@/store";
import { darkMode } from "/@/settings/style";
import { resetRouter } from "/@/router";
import { deepMerge } from "/@/utils";
import { Persistent } from "/@/utils/cache/persistent";
import { APP_CONFIG_KEY, APP_DARK_MODE_KEY } from "/@/enums/cache";

let timeId: TimeoutHandle;

export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    config: Persistent.getLocal(APP_CONFIG_KEY) || ({} as AppConfig),
    beforeRestoreInfo: {},
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getDarkMode(): string {
      return (
        this.darkMode || Persistent.getLocal(APP_DARK_MODE_KEY) || darkMode
      );
    },
    getBeforeRestoreInfo(): BeforeRestoreInfo {
      return this.beforeRestoreInfo;
    },
    getAppConfig(): AppConfig {
      return this.config || ({} as AppConfig);
    },
    getMenuSetting(): MenuSetting {
      return this.getAppConfig.menuSetting;
    },
    getTransitionSetting(): TransitionSetting {
      return this.getAppConfig.transitionSetting;
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode;
      Persistent.setLocal(APP_DARK_MODE_KEY, mode);
    },
    setBeforeRestoreInfo(state: BeforeRestoreInfo): void {
      this.beforeRestoreInfo = state;
    },
    setAppConfig(config: DeepPartial<AppConfig>): void {
      this.config = deepMerge(this.config || {}, config);
      Persistent.setLocal(APP_CONFIG_KEY, this.config);
    },
    setTransitionSetting(transitionSetting: TransitionSetting) {
      this.setAppConfig({ transitionSetting });
    },
    async resetAllState() {
      resetRouter();
      Persistent.clearAll();
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
