import { getEnvConfig } from "/@/utils/env";

const { VITE_APP_NAME } = getEnvConfig();

export function sLog(message: any) {
  console.log(`[${VITE_APP_NAME} log]:`, message);
}

export function sWarn(message: any) {
  console.warn(`[${VITE_APP_NAME} warn]:`, message);
}

export function sError(message: any, isThrow = false) {
  const result = `[${VITE_APP_NAME} error]:`;
  if (isThrow) {
    throw new Error(`${result} ${message}`);
  } else {
    console.error(result, message);
  }
}
