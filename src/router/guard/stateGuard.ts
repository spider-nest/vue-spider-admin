import type { Router } from "vue-router";

import { useAppStore } from "@/store/modules/app";
import { useUserStore } from "@/store/modules/user";
import { usePermissionStore } from "@/store/modules/permission";

import { PageEnum } from "@/enums/pageEnum";

export default function stateGuard(router: Router) {
  router.afterEach((to) => {
    const appStore = useAppStore();
    const userStore = useUserStore();
    const permissionStore = usePermissionStore();

    if (to.path === PageEnum.BASE_LOGIN) {
      appStore.resetAllState();
      userStore.resetState();
      permissionStore.resetState();
    }
  });
}
