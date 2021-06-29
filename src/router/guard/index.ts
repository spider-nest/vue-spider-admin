import type { Router } from "vue-router";

import scrollGuard from "./scrollGuard";
import httpGuard from "./httpGuard";

export default function setupRouterGuard(router: Router) {
  httpGuard(router);
  scrollGuard(router);
}
