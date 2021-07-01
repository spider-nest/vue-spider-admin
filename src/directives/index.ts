import type { App } from "vue";

import { setupPermissionDirective } from "./permission";

export default (app: App) => {
  setupPermissionDirective(app);
};
