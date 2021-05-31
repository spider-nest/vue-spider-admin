import type { Router } from "vue-router";

import { unref } from "vue";
import nProgress from "nprogress";

import { useTransition } from "/@/hooks/useTransition";

export default (router: Router) => {
  const { enableProgressTransition } = useTransition();

  router.beforeEach(async (to) => {
    if (to.meta.loaded) return true;
    unref(enableProgressTransition) && nProgress.start();
    return true;
  });

  router.afterEach(async () => {
    unref(enableProgressTransition) && nProgress.done();
    return true;
  });
};
