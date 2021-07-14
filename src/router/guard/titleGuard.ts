import type { Router } from "vue-router";

import { useTitle } from "@vueuse/core";

export default function titleGuard(router: Router) {
  const documentTitle = useTitle();
  const { appName } = __VITE_ENV__;

  router.afterEach((to) => {
    const title = to?.meta?.title;
    documentTitle.value = title ? `${title} - ${appName}` : appName;
  });
}
