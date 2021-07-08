import type { CreateStorageParams } from "./storageCache";

import { createStorage as createStorageCache } from "./storageCache";

import { DEFAULT_CACHE_TIME } from "@/configs/encryptionConfig";

import { getStorageShortname, isProdMode } from "@/utils/env";

type Options = Partial<CreateStorageParams>;

const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    hasEncrypt: isProdMode(),
    storage,
    prefixKey: getStorageShortname(),
    ...options,
  };
};

const WebStorage = createStorageCache(createOptions(sessionStorage));

const createStorage = (
  storage: Storage = sessionStorage,
  options: Options = {}
) => {
  return createStorageCache(createOptions(storage, options));
};

export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, {
    ...options,
    timeout: DEFAULT_CACHE_TIME,
  });
};

export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, {
    ...options,
    timeout: DEFAULT_CACHE_TIME,
  });
};

export default WebStorage;
