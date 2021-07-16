import type { Router } from "vue-router";

import { unref, ref } from "vue";

import { useTransitionConfig } from "@/hooks/config/useTransitionConfig";

import { REDIRECT_NAME } from "@/router/constant";

export const loadingBarRef = ref();

export default function loadingBarGuard(router: Router) {
  const { getLoadingBar } = useTransitionConfig();

  router.beforeEach((to, from) => {
    if (to.meta.loaded) {
      return;
    }
    if (
      to.name === REDIRECT_NAME ||
      from.name === REDIRECT_NAME ||
      to.name === from.name
    ) {
      return;
    }
    unref(getLoadingBar) && loadingBarRef.value && loadingBarRef.value.start();
  });

  router.afterEach((to, from) => {
    if (to.name === from.name) return;
    unref(getLoadingBar) && loadingBarRef.value && loadingBarRef.value.finish();
  });
}
