import type { Router } from "vue-router";

import { PageEnum } from "/@/enums/page";
import { useAppStore } from "/@/store/modules/app";
import { useUserStore } from "/@/store/modules/user";
import { userPermissionStore } from "/@/store/modules/permission";

export default (router: Router) => {
  router.afterEach((to) => {
    const appStore = useAppStore();
    const permissionStore = userPermissionStore();
    const userStore = useUserStore();

    if (to.path === PageEnum.BASE_LOGIN_PATH) {
      appStore.resetAllState();
      permissionStore.resetState();
      userStore.resetState();
    }
  });
};
