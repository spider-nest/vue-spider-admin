import type { AppConfig, MenuConfig, TransitionConfig } from "@/types/config";

import { defineStore } from "pinia";

import { store } from "@/store";
import { resetRouter } from "@/router";

import { APP_CONFIG_KEY } from "@/enums/cacheEnum";

import Persistent from "@/utils/cache/persistent";
import { deepMerge } from "@/utils/object";

interface BeforeMiniState {
  menuCollapsed?: boolean;
}

interface AppState {
  // 应用配置
  appConfig: AppConfig | null;
  // 当窗口缩小时，记住一些状态，并在窗口恢复时恢复这些状态
  beforeMiniInfo: BeforeMiniState;
}

export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    appConfig: Persistent.getLocal(APP_CONFIG_KEY),
    beforeMiniInfo: {},
  }),
  getters: {
    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo;
    },
    getAppConfig(): AppConfig {
      return this.appConfig || ({} as AppConfig);
    },
    getMenuConfig(): MenuConfig {
      return this.getAppConfig.menuConfig;
    },
    getTransitionConfig(): TransitionConfig {
      return this.getAppConfig.transitionConfig;
    },
  },
  actions: {
    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state;
    },
    setAppConfig(config: DeepPartial<AppConfig>): void {
      this.appConfig = deepMerge(this.appConfig || {}, config);
      Persistent.setLocal(APP_CONFIG_KEY, this.appConfig);
    },
    async resetAllState() {
      resetRouter();
      Persistent.clearAll();
    },
  },
});

// 在 setup 之外使用
export function useAppStoreWithout() {
  return useAppStore(store);
}
