import type { Router } from "vue-router";

import { unref } from "vue";

import { useUserStoreWithout } from "/@/store/modules/user";
import { useAppStoreWithout } from "/@/store/modules/app";
import { useTransition } from "/@/hooks/useTransition";

export default (router: Router) => {
  const userStore = useUserStoreWithout();
  const appStore = useAppStoreWithout();
  const { enablePageLoadingTransition } = useTransition();

  router.beforeEach(async (to) => {
    if (!userStore.getToken) {
      return true;
    }
    if (to.meta.loaded) {
      return true;
    }

    if (unref(enablePageLoadingTransition)) {
      appStore.setPageLoadingAction(true);
      return true;
    }

    return true;
  });

  router.afterEach(async () => {
    if (unref(enablePageLoadingTransition)) {
      setTimeout(() => {
        appStore.setPageLoading(false);
      }, 150);
    }
    return true;
  });
};
