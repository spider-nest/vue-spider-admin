import type { Router } from "vue-router";

import httpGuard from "./httpGuard";
import scrollGuard from "./scrollGuard";
import messageGuard from "./messageGuard";
import loadingBarGuard from "./loadingBarGuard";
import titleGuard from "./titleGuard";
import permissionGuard from "./permissionGuard";
import stateGuard from "./stateGuard";

export default function setupRouterGuard(router: Router) {
  httpGuard(router);
  scrollGuard(router);
  messageGuard(router);
  loadingBarGuard(router);
  titleGuard(router);
  permissionGuard(router);
  stateGuard(router);
}
