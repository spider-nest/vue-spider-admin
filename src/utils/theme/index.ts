import type { AppConfig } from "/#/config";

import { darkCssIsReady, loadDarkThemeCss } from "vite-plugin-theme/es/client";

import { changeTheme, primaryColor } from "/@/../build/theme";
import { useAppStore } from "/@/store/modules/app";
import { useLocaleStore } from "/@/store/modules/locale";
import { deepMerge } from "/@/utils";
import { Persistent } from "/@/utils/cache/persistent";
import { isProdMode } from "/@/utils/env";
import { APP_CONFIG_KEY } from "/@/enums/cache";
import appSetting from "/@/settings/app";
import { toggleClass } from "./util";

export function updateGrayMode(flag: boolean) {
  toggleClass(flag, "gray-mode");
}

export function updateColorWeak(flag: boolean) {
  toggleClass(flag, "color-weak");
}

export async function updateDarkTheme(mode: string) {
  const html = document.getElementById("html");
  if (mode === "dark" && isProdMode() && !darkCssIsReady) {
    await loadDarkThemeCss();
  }
  html?.setAttribute("data-theme", mode);
}

export function launchAppConfig() {
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
    console.log(error);
  }
  appStore.setAppConfig(appConfig);
  updateDarkTheme(darkMode);

  localeStore.initLocale();
}
