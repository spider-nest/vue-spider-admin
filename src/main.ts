import { createApp } from "vue";
import "virtual:svg-icons-register";

import App from "/@/views/spider.vue";

import { setupStore } from "/@/store";

import launchAppConfig from "/@/utils/theme/launch";

// import { iconGlobalization, componentGlobalization } from "/@/components";
import { iconGlobalization } from "/@/components";

import { setupLocale } from "/@/locales";

import router, { setupRouter } from "/@/router";

import setupRouterGuard from "/@/router/guard";

import setupDirective from "/@/directives";

import { isDevMode } from "/@/utils/env";
import "/@/styles/index.less";
if (isDevMode()) {
  import("ant-design-vue/dist/antd.less");
}

(async () => {
  const app = createApp(App);

  setupStore(app);

  launchAppConfig();

  iconGlobalization(app);
  // componentGlobalization(app);

  await setupLocale(app);

  setupRouter(app);

  setupRouterGuard();

  setupDirective(app);

  await router.isReady();

  app.mount("#spider", true);

  if (isDevMode()) {
    window.__APP__ = app;
  }
})();
