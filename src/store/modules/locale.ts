import { defineStore } from "pinia";

import { store } from "/@/store";
import { localeSetting } from "/@/settings/locale";

interface LocaleState {
  localInfo: LocaleSetting;
}

export const useLocaleStore = defineStore({
  id: "app-locale",
  state: (): LocaleState => ({
    localInfo: {} as LocaleSetting,
  }),
  getters: {
    getShowPicker() {
      return !!this.localInfo?.showPicker;
    },
    getLocale(): LocaleType {
      return this.localInfo?.locale ?? "zh_CN";
    },
  },
  actions: {
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info };
    },
    initLocale() {
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localInfo,
      });
    },
  },
});

// Use outside of setup
export function useLocaleStoreWithout() {
  return useLocaleStore(store);
}
