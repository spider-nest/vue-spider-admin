import { createApp } from "vue";

import App from "@/pages/Spider.vue";

import { setupStore } from "@/store";

import { router, setupRouter } from "@/router";

import setupDirective from "@/directives";

import "vfonts/Roboto.css";

const app = createApp(App);

setupStore(app);

setupRouter(app);

setupDirective(app);

router.isReady().then(() => {
  app.mount("#spider", true);
});
