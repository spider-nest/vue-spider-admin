import type { EncryptionParams } from "/@/utils/cipher";

import { isDevMode } from "/@/utils/env";

export const EXPIRE_TIME = 60 * 60 * 2;

export const encryptionKey: EncryptionParams = {
  key: "_01234567891011@",
  iv: "@01234567891011_",
};

export const enableStorageEncryption = !isDevMode();
