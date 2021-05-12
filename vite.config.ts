import type { UserConfig, ConfigEnv } from "vite";

import { resolve } from "path";
import { loadEnv } from "vite";
import moment from "moment";

import pkg from "./package.json";
import { wrapperEnv } from "./build/utils";
import { OUTPUT_DIR } from "./build/config";
import { generateModifyVars } from "./build/generate";
import { createProxy } from "./build/vite-proxy";
import { createVitePlugins } from "./build/vite-plugin";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

const { dependencies, devDependencies, name, version, homepage } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version, homepage },
  lastBuildTime: moment().format("YYYY-MM-DD HH:mm:ss"),
};

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } =
    viteEnv;
  const isBuild = command === "build";

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve("src") + "/",
        },
        {
          find: /\/#\//,
          replacement: pathResolve("types") + "/",
        },
      ],
    },
    server: {
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    build: {
      target: "es2015",
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      brotliSize: false,
      chunkSizeWarningLimit: 1024,
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    optimizeDeps: {
      include: [
        "@iconify/iconify",
        "ant-design-vue/es/locale/zh_CN",
        "ant-design-vue/es/locale/en_US",
        "moment/dist/locale/zh-cn",
        "moment/dist/locale/eu",
      ],
      exclude: ["vue-demi"],
    },
  };
};
