import { createApp } from "vue";
import "vite-plugin-svg-icons/register";

import App from "/@/views/spider.vue";
import { setupStore } from "/@/store";
import { setupLocale } from "/@/locales";
import router, { setupRouter } from "/@/router";

import "/@/styles/index.less";
if (import.meta.env.DEV) {
  import("ant-design-vue/dist/antd.less");
}

(async () => {
  const app = createApp(App);

  setupStore(app);

  await setupLocale(app);

  setupRouter(app);

  await router.isReady();

  app.mount("#spider", true);

  if (import.meta.env.DEV) {
    window.__APP__ = app;
  }
})();
