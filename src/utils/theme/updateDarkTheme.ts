import { darkCssIsReady, loadDarkThemeCss } from "vite-plugin-theme/es/client";

import { isProdMode } from "/@/utils/env";

export default async (mode: string) => {
  const html = document.getElementById("html");
  if (mode === "dark" && isProdMode() && !darkCssIsReady) {
    await loadDarkThemeCss();
  }
  html?.setAttribute("data-theme", mode);
};
