import { getEnvConfig } from "/@/utils/env";

export function useSetting() {
  const { VITE_APP_NAME } = getEnvConfig();

  return { title: VITE_APP_NAME };
}
