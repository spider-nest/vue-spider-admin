import type { AppConfig } from "@/types/config";

import { unref } from "vue";
import { useThemeVars } from "naive-ui";

import { SessionTimeoutProcessingEnum } from "@/enums/appEnum";
import { CacheTypeEnum } from "@/enums/cacheEnum";

const { infoColor } = unref(useThemeVars());

const appConfig: AppConfig = {
  permissionCacheType: CacheTypeEnum.LOCAL,
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,
  themeColor: infoColor,
  fullContent: false,
  menuConfig: {
    collapsed: false,
  },
  openKeepAlive: true,
};

export default appConfig;
