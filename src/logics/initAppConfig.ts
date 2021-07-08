import { useAppStore } from "@/store/modules/app";

import appConfig from "@/configs/appConfig";

import { APP_CONFIG_KEY } from "@/enums/cacheEnum";

import Persistent from "@/utils/cache/persistent";
import { deepMerge } from "@/utils/object";

export function initAppConfigStore() {
  const appStore = useAppStore();

  appStore.setAppConfig(
    deepMerge(appConfig, Persistent.getLocal(APP_CONFIG_KEY) || {})
  );
}
