import type { EncryptionParams } from "/@/utils/cipher";

import { encryptionKey } from "/@/settings/encryption";
import { AesEncryption } from "/@/utils/cipher";

export interface CreateStorageParams extends EncryptionParams {
  prefixKey: string;
  storage: Storage;
  hasEncrypt: boolean;
  timeout?: number;
}

export const createWebStorage = ({
  prefixKey = "",
  storage = sessionStorage,
  key = encryptionKey.key,
  iv = encryptionKey.iv,
  timeout = 0,
  hasEncrypt = true,
}: Partial<CreateStorageParams> = {}) => {
  const encryption = new AesEncryption({ key, iv });
  const WebStorage = class WebStorage {
    private storage: Storage;
    private prefixKey?: string;
    private encryption: AesEncryption;
    private hasEncrypt: boolean;

    constructor() {
      this.storage = storage;
      this.prefixKey = prefixKey;
      this.encryption = encryption;
      this.hasEncrypt = hasEncrypt;
    }

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }

    set(key: string, value: any, expire: number = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: expire > 0 ? new Date().getTime() + expire * 1000 : null,
      });
      const stringifyValue = this.hasEncrypt
        ? this.encryption.encryptByAES(stringData)
        : stringData;
      this.storage.setItem(this.getKey(key), stringifyValue);
    }

    get(key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key));
      if (!val) return def;

      try {
        const decVal = this.hasEncrypt
          ? this.encryption.decryptByAES(val)
          : val;
        const data = JSON.parse(decVal);
        const { value, expire } = data;
        if (expire === 0 || expire >= new Date().getTime()) {
          return value;
        }
        this.remove(key);
      } catch (error) {
        return def;
      }
    }

    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }

    clear(): void {
      this.storage.clear();
    }
  };
  return new WebStorage();
};
