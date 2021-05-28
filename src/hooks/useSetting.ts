import { getEnvConfig } from "/@/utils/env";

export function useSetting() {
  const { VITE_APP_NAME, VITE_API_PREFIX } = getEnvConfig();

  return { title: VITE_APP_NAME, apiPrefix: VITE_API_PREFIX };
}
