import { createApp } from "vue";

import App from "@/pages/Spider.vue";

import { setupStore } from "@/store";

import { router, setupRouter } from "@/router";

import setupRouterGuard from "@/router/guard";

// import setupDirective from "@/directives";

import "vfonts/Roboto.css";

async function bootstrap() {
  const app = createApp(App);

  setupStore(app);

  setupRouter(app);

  setupRouterGuard(router);

  // setupDirective(app);

  await router.isReady();

  app.mount("#spider", true);
}

void bootstrap();
