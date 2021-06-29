import { version } from "../../package.json";

export function getEnvMode(): string {
  return import.meta.env.MODE;
}

export function getStoragePrefix(): string {
  const { app_shortname } = __VITE_ENV__;
  return `${app_shortname}_${getEnvMode()}`.toUpperCase();
}

export function getStorageShortname(): string {
  return `${getStoragePrefix()}_${version}`.toUpperCase();
}

export function isDevMode(): boolean {
  return import.meta.env.DEV;
}

export function isProdMode(): boolean {
  return import.meta.env.PROD;
}
