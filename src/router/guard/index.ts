import type { Router } from "vue-router";

import scrollGuard from "./scrollGuard";
import httpGuard from "./httpGuard";
import messageGuard from "./messageGuard";

export default function setupRouterGuard(router: Router) {
  httpGuard(router);
  scrollGuard(router);
  messageGuard(router);
}
