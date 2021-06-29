import type { EncryptionParams } from "@/utils/cipher";

// 默认缓存秒数
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

// aes 加密 key
export const cacheCipher: EncryptionParams = {
  key: "_01234567891011@",
  iv: "@01234567891011_",
};
