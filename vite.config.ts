import type { UserConfig } from "vite";

import { resolve } from "path";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

export default (): UserConfig => {
  return {
    base: "/",
    resolve: {
      alias: [
        {
          find: /^@\//,
          replacement: pathResolve("src") + "/",
        },
      ],
    },
  };
};
