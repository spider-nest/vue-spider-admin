import type { UserConfig } from "vite";

import { resolve } from "path";

const root = process.cwd();
const base = "/";

const pathResolve = (dir: string): string => {
  return resolve(root, ".", dir);
};

export default (): UserConfig => {
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
  };
};
