import type { CreateStorageParams } from "./storage";

import { getStorageShortName } from "/@/utils/env";
import { createWebStorage } from "./storage";
import { enableStorageEncryption, EXPIRE_TIME } from "/@/settings/encryption";

export type Options = Partial<CreateStorageParams>;

const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    hasEncrypt: enableStorageEncryption,
    storage,
    prefixKey: getStorageShortName(),
    ...options,
  };
};

export const WebStorage = createWebStorage(createOptions(sessionStorage));

export const createStorage = (
  storage: Storage = sessionStorage,
  options: Options = {}
) => {
  return createWebStorage(createOptions(storage, options));
};

export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, {
    ...options,
    timeout: EXPIRE_TIME,
  });
};

export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, {
    ...options,
    timeout: EXPIRE_TIME,
  });
};
