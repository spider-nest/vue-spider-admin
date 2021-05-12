import { getConfigFileName } from "/@/../build/utils";

export function getEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env);
  const ENV = (
    import.meta.env.DEV ? import.meta.env : window[ENV_NAME]
  ) as ViteEnv;

  const { VITE_APP_NAME } = ENV;

  return { VITE_APP_NAME };
}
