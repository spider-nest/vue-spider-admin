import type { Router } from "vue-router";

import { unref, ref } from "vue";

import { useTransitionConfig } from "@/hooks/config/useTransitionConfig";

export const loadingBarRef = ref();

export default function loadingBarGuard(router: Router) {
  const { getLoadingBar } = useTransitionConfig();

  router.beforeEach((to) => {
    if (to.meta.loaded) {
      return;
    }
    unref(getLoadingBar) && loadingBarRef.value && loadingBarRef.value.start();
  });

  router.afterEach(() => {
    // unref(getLoadingBar) && loadingBarRef.value && loadingBarRef.value.finish();
  });
}
