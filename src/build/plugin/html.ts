import type { Plugin } from "vite";

import type { ViteEnv } from "@/types/env";

import html from "vite-plugin-html";

export default function htmlPlugin(env: ViteEnv, isBuild: boolean): Plugin[] {
  const { VITE_APP_NAME } = env;

  return html({
    minify: isBuild,
    inject: {
      injectData: {
        title: VITE_APP_NAME,
      },
    },
  });
}
