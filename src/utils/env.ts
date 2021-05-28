import { getConfigFileName } from "/@/../build/utils";
import pkg from "../../package.json";

export function getEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env);
  const ENV = (isDevMode() ? import.meta.env : window[ENV_NAME]) as ViteEnv;

  const { VITE_APP_NAME, VITE_APP_SHORTNAME } = ENV;

  return { VITE_APP_NAME, VITE_APP_SHORTNAME };
}

export function isDevMode(): boolean {
  return import.meta.env.DEV;
}

export function isProdMode(): boolean {
  return import.meta.env.PROD;
}

export function getEnv(): string {
  return import.meta.env.MODE;
}

export function getCommonStoragePrefix() {
  const { VITE_APP_SHORTNAME } = getEnvConfig();
  return `${VITE_APP_SHORTNAME}__${getEnv()}`.toUpperCase();
}

export function getStorageShortName() {
  return `${getCommonStoragePrefix()}__${pkg.version}__`.toUpperCase();
}
