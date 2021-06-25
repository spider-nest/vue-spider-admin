import { createApp } from "vue";

import App from "@/pages/Spider.vue";

// import { setupStore } from "@/store";
//
// import { setupLocale } from "@/locales";
//
// import { router, setupRouter } from "@/router";
//
// import setupRouterGuard from "@/router/guard";
//
// import setupDirective from "@/directives";

import "vfonts/Roboto.css";

async function bootstrap() {
  const app = createApp(App);

  // setupStore(app);
  //
  // await setupLocale(app);
  //
  // setupRouter(app);
  //
  // setupRouterGuard();
  //
  // setupDirective(app);
  //
  // await router.isReady();

  app.mount("#spider", true);
}

void bootstrap();
