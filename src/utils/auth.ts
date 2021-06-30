import appConfig from "@/configs/appConfig";

import { CacheTypeEnum } from "@/enums/cacheEnum";
import { TOKEN_KEY } from "@/enums/cacheEnum";

import Persistent, { BasicKeys } from "@/utils/cache/persistent";

const { permissionCacheType } = appConfig;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

export function getToken() {
  return getAuthCache(TOKEN_KEY);
}

export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key) as T;
}

export function setAuthCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value, true);
}
