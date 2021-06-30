import type { Router } from "vue-router";

import httpGuard from "./httpGuard";
import scrollGuard from "./scrollGuard";
import messageGuard from "./messageGuard";
import loadingBarGuard from "./loadingBarGuard";
import permissionGuard from "./permissionGuard";
import stateGuard from "./stateGuard";

export default function setupRouterGuard(router: Router) {
  httpGuard(router);
  scrollGuard(router);
  messageGuard(router);
  loadingBarGuard(router);
  permissionGuard(router);
  stateGuard(router);
}
