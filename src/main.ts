import { createApp } from "vue";

import App from "@/pages/Spider.vue";

import { setupStore } from "@/store";

import { initAppConfigStore } from "@/logics/initAppConfig";

import { router, setupRouter } from "@/router";

import setupRouterGuard from "@/router/guard";

import setupDirective from "@/directives";

import "vfonts/Roboto.css";

async function bootstrap() {
  const app = createApp(App);

  setupStore(app);

  initAppConfigStore();

  setupRouter(app);

  setupRouterGuard(router);

  setupDirective(app);

  await router.isReady();

  app.mount("#spider", true);
}

void bootstrap();
