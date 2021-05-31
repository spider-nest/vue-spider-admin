import type { AppConfig } from "/#/config";

import { useAppStore } from "/@/store/modules/app";
import { useLocaleStore } from "/@/store/modules/locale";
import { deepMerge } from "/@/utils";
import appSetting from "/@/settings/app";
import { Persistent } from "/@/utils/cache/persistent";
import { APP_CONFIG_KEY } from "/@/enums/cache";
import { primaryColor } from "/@/../build/theme";
import { sError } from "/@/utils/console";
import { changeTheme } from "/@/utils/theme";
import updateGrayMode from "./updateGrayMode";
import updateColorWeak from "./updateColorWeak";
import updateDarkTheme from "./updateDarkTheme";

export default () => {
  const appStore = useAppStore();
  const localeStore = useLocaleStore();
  const appConfig: AppConfig = deepMerge(
    appSetting,
    Persistent.getLocal(APP_CONFIG_KEY)
  );
  const darkMode = appStore.getDarkMode;
  const { themeColor, grayMode, colorWeak } = appConfig;
  try {
    if (themeColor !== primaryColor) {
      changeTheme(themeColor);
    }
    grayMode && updateGrayMode(grayMode);
    colorWeak && updateColorWeak(colorWeak);
  } catch (error) {
    sError(error);
  }
  appStore.setAppConfig(appConfig);
  updateDarkTheme(darkMode);

  localeStore.initLocale();
};
