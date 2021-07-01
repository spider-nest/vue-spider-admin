import type { App } from "vue";

import { createPinia } from "pinia";

import { initAppConfigStore } from "@/logics/initAppConfig";

const store = createPinia();

export function setupStore(app: App<Element>) {
  app.use(store);
  initAppConfigStore();
}

export { store };
