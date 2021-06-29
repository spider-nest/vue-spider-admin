import type { UserConfig, ConfigEnv } from "vite";

import type { ViteEnv } from "./src/types/env";

import { resolve } from "path";
import { loadEnv } from "vite";
import { format } from "date-fns";

import createVitePlugins from "./src/build";
import { version } from "./package.json";

const root = process.cwd();
const base = "/";

const pathResolve = (dir: string): string => {
  return resolve(root, ".", dir);
};

const handleViteEnv = (viteEnv): ViteEnv => {
  const result: any = {};
  for (const key of Object.keys(viteEnv)) {
    let value = viteEnv[key];
    if (value === "true") {
      value = true;
    } else if (value === "false") {
      value = false;
    } else if (key === "VITE_SERVER_PORT") {
      value = Number(value);
    }
    result[key] = value;
  }
  return result;
};

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === "build";
  const viteEnv = handleViteEnv(loadEnv(mode, root));
  const { VITE_SERVER_PORT, VITE_API_PREFIX, VITE_APP_SHORTNAME } = viteEnv;

  return {
    root,
    base,
    resolve: {
      alias: [
        {
          find: /^@\//,
          replacement: pathResolve("src") + "/",
        },
      ],
    },
    server: {
      host: "0.0.0.0",
      port: VITE_SERVER_PORT,
      strictPort: true,
      proxy: {
        [VITE_API_PREFIX]: {
          target: "http://localhost",
          changeOrigin: true,
          ws: true,
          secure: false,
          rewrite: (path) =>
            path.replace(new RegExp(`^${VITE_API_PREFIX}`), ""),
        },
      },
    },
    build: {
      target: "es2015",
      outDir: "dist",
      assetsDir: "assets",
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      sourcemap: false,
      minify: "terser",
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true,
        },
      },
      brotliSize: false,
      chunkSizeWarningLimit: 500,
    },
    define: {
      __APP_INFO__: {
        version,
        buildTime: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      },
      __VITE_ENV__: {
        appShortname: VITE_APP_SHORTNAME,
      },
    },
    plugins: createVitePlugins(viteEnv, isBuild),
  };
};
