import type { Plugin } from "vite";

import html from "vite-plugin-html";

import pkg from "../../../package.json";
import { GLOB_CONFIG_FILE_NAME } from "../config";

export default function htmlPlugin(env: ViteEnv, isBuild: boolean): Plugin[] {
  const { VITE_APP_NAME, VITE_PUBLIC_PATH } = env;

  const path = VITE_PUBLIC_PATH.endsWith("/")
    ? VITE_PUBLIC_PATH
    : `${VITE_PUBLIC_PATH}/`;

  const getAppConfigSrc = () => {
    return `${path || "/"}${GLOB_CONFIG_FILE_NAME}?v=${
      pkg.version
    }-${new Date().getTime()}`;
  };

  return html({
    minify: isBuild,
    inject: {
      injectData: {
        title: VITE_APP_NAME,
      },
      tags: isBuild
        ? [
            {
              tag: "script",
              attrs: {
                src: getAppConfigSrc(),
              },
            },
          ]
        : [],
    },
  });
}
