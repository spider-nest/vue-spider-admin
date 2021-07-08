import type { AppConfig } from "@/types/config";
import type { UserInfo } from "@/types/store";

import { toRaw } from "vue";

import { createLocalStorage, createSessionStorage } from "./";
import Memory from "./memory";

import {
  APP_CONFIG_KEY,
  TOKEN_KEY,
  USER_INFO_KEY,
  ROLES_KEY,
  APP_LOCAL_CACHE_KEY,
  APP_SESSION_CACHE_KEY,
} from "@/enums/cacheEnum";

import { DEFAULT_CACHE_TIME } from "@/configs/encryptionConfig";

interface BasicStore {
  [APP_CONFIG_KEY]: AppConfig;
  [TOKEN_KEY]: string | number | null | undefined;
  [USER_INFO_KEY]: UserInfo;
  [ROLES_KEY]: string[];
}

export type BasicKeys = keyof BasicStore;

type LocalStore = BasicStore;
type SessionStore = BasicStore;

type LocalKeys = keyof LocalStore;
type SessionKeys = keyof SessionStore;

const ls = createLocalStorage();
const ss = createSessionStorage();

const localMemory = new Memory(DEFAULT_CACHE_TIME);
const sessionMemory = new Memory(DEFAULT_CACHE_TIME);

export default class Persistent {
  static getLocal<T>(key: LocalKeys) {
    return localMemory.get(key)?.value as Nullable<T>;
  }

  static setLocal(
    key: LocalKeys,
    value: LocalStore[LocalKeys],
    immediate = false
  ): void {
    localMemory.set(key, toRaw(value));
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
  }

  static removeLocal(key: LocalKeys): void {
    localMemory.remove(key);
  }

  static clearLocal(): void {
    localMemory.clear();
  }

  static getSession<T>(key: SessionKeys) {
    return sessionMemory.get(key)?.value as Nullable<T>;
  }

  static setSession(
    key: SessionKeys,
    value: SessionStore[SessionKeys],
    immediate = false
  ): void {
    sessionMemory.set(key, toRaw(value));
    immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
  }

  static removeSession(key: SessionKeys): void {
    sessionMemory.remove(key);
  }

  static clearSession(): void {
    sessionMemory.clear();
  }

  static clearAll() {
    sessionMemory.clear();
    localMemory.clear();
  }
}

function initPersistentMemory() {
  const localCache = ls.get(APP_LOCAL_CACHE_KEY);
  const sessionCache = ss.get(APP_SESSION_CACHE_KEY);
  localCache && localMemory.resetCache(localCache);
  sessionCache && sessionMemory.resetCache(sessionCache);
}

function storageChange(e: any) {
  const { key, nv, ov } = e;

  if (!key) {
    Persistent.clearAll();
    return;
  }

  if (!!nv && !!ov) {
    if (key === APP_LOCAL_CACHE_KEY) {
      Persistent.clearLocal();
    } else if (key === APP_SESSION_CACHE_KEY) {
      Persistent.clearSession();
    }
  }
}

window.addEventListener("beforeunload", () => {
  ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
  ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
});

window.addEventListener("storage", storageChange);

initPersistentMemory();
