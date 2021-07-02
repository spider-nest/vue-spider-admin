import type { AppConfig } from "@/types/config";

import { SessionTimeoutProcessingEnum } from "@/enums/appEnum";
import { CacheTypeEnum } from "@/enums/cacheEnum";

import {
  namespace as styleNamespace,
  prefix as stylePrefix,
} from "@/utils/cssr";

const appConfig: AppConfig = {
  permissionCacheType: CacheTypeEnum.LOCAL,
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,
  themeColor: "#2080f0",
  fullContent: false,
  menuConfig: {
    collapsed: false,
  },
  transitionConfig: {
    openLoadingBar: true,
  },
  openKeepAlive: true,
  styleNamespace,
  stylePrefix,
};

export default appConfig;
