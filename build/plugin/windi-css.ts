import type { Plugin } from "vite";

import windiCSS from "vite-plugin-windicss";

export default function windiCssPlugin(): Plugin[] {
  return windiCSS({
    safelist: "no-select",
    preflight: {
      enableAll: true,
    },
  });
}
