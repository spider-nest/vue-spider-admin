import { getEnvConfig } from "/@/utils/env";

const { VITE_APP_NAME } = getEnvConfig();

export function sLog(message: string) {
  console.log(`[${VITE_APP_NAME} log]:${message}`);
}

export function sWarn(message: string) {
  console.warn(`[${VITE_APP_NAME} warn]:${message}`);
}

export function sError(message: string, isThrow = false) {
  const result = `[${VITE_APP_NAME} error]:${message}`;
  if (isThrow) {
    throw new Error(result);
  } else {
    console.error(result);
  }
}
