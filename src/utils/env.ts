import type { EnvConfig } from "@/types/config";

export function getEnvConfig(): EnvConfig {
  const env = process.env;
  return (env as unknown) as EnvConfig;
}

export const devMode = "development";

export const prodMode = "production";

export function isDevMode(): boolean {
  return getEnvConfig().mode === devMode;
}

export function isProdMode(): boolean {
  return getEnvConfig().mode === prodMode;
}

export function isMock(): boolean {
  return getEnvConfig().mock === "true";
}
