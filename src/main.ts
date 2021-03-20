import { createApp } from "vue";
import App from "@/views/spider.vue";

import { setupLocale } from "@/locales";

import router, { setupRouter } from "@/router";

(async () => {
  const app = createApp(App);

  await setupLocale(app);

  setupRouter(app);

  await router.isReady();

  app.mount("#spider", true);
})();
