import { useAppStore } from "@/store/modules/app";

import appConfig from "@/configs/appConfig";

export function initAppConfigStore() {
  const appStore = useAppStore();
  appStore.setAppConfig(appConfig);
}
