import type { AppConfig } from "@/types/config";

import { CacheTypeEnum } from "@/enums/cacheEnum";

import {
  namespace as styleNamespace,
  prefix as stylePrefix,
} from "@/utils/cssr";

const appConfig: AppConfig = {
  permissionCacheType: CacheTypeEnum.LOCAL,
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
