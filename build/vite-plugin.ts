import type { Plugin } from "vite";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";
import purgeIconsPlugin from "vite-plugin-purge-icons";

import {
  hmrPlugin,
  htmlPlugin,
  svgIconsPlugin,
  styleImportPlugin,
  visualizerRollupPlugin,
  themePlugin,
  imageminPlugin,
  compressPlugin,
  mockPlugin,
} from "./plugin";

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_LEGACY, VITE_IMAGEMIN, VITE_BUILD_COMPRESS, VITE_USE_MOCK } =
    viteEnv;
  const vitePlugins: (Plugin | Plugin[])[] = [vue(), vueJsx()];

  vitePlugins.push(htmlPlugin(viteEnv, isBuild));
  vitePlugins.push(svgIconsPlugin(isBuild));
  vitePlugins.push(purgeIconsPlugin());
  vitePlugins.push(visualizerRollupPlugin());
  vitePlugins.push(themePlugin(isBuild));
  VITE_USE_MOCK && vitePlugins.push(mockPlugin(isBuild));

  if (isBuild) {
    VITE_LEGACY && vitePlugins.push(legacy());
    vitePlugins.push(styleImportPlugin());
    VITE_IMAGEMIN && vitePlugins.push(imageminPlugin());
    vitePlugins.push(compressPlugin(VITE_BUILD_COMPRESS));
  } else {
    vitePlugins.push(hmrPlugin());
  }

  return vitePlugins;
}
