import type { Plugin } from "vite";

import type { ViteEnv } from "@/types/env";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import htmlPlugin from "./plugin/html";
import mockPlugin from "./plugin/mock";
import compressPlugin from "./plugin/compress";
import imageminPlugin from "./plugin/imagemin";

export default function createVitePlugins(
  viteEnv: ViteEnv,
  isBuild: boolean
): (Plugin | Plugin[])[] {
  const { VITE_MOCK } = viteEnv;
  const vitePlugins: (Plugin | Plugin[])[] = [vue(), vueJsx()];

  vitePlugins.push(htmlPlugin(viteEnv, isBuild));
  VITE_MOCK && vitePlugins.push(mockPlugin(isBuild));

  if (isBuild) {
    vitePlugins.push(compressPlugin());
    vitePlugins.push(imageminPlugin());
  }

  return vitePlugins;
}
