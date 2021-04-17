import type { Plugin } from "vite";

import styleImport from "vite-plugin-style-import";

export default function configStyleImportPlugin(): Plugin {
  return styleImport({
    libs: [
      {
        libraryName: "ant-design-vue",
        esModule: true,
        resolveStyle: (name) => {
          return `ant-design-vue/es/${name}/style/index`;
        },
      },
    ],
  });
}
