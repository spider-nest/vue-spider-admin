import type { Router } from "vue-router";

import { unref } from "vue";
import { useLoadingBar } from "naive-ui";

import { useTransitionConfig } from "@/hooks/config/useTransitionConfig";

export default function loadingBarGuard(router: Router) {
  const { getLoadingBar } = useTransitionConfig();
  const loadingBar = useLoadingBar();

  router.beforeEach((to) => {
    if (to.meta.loaded) {
      return true;
    }

    unref(getLoadingBar) && loadingBar?.start();

    return true;
  });

  router.afterEach(() => {
    unref(getLoadingBar) && loadingBar?.finish();

    return true;
  });
}
