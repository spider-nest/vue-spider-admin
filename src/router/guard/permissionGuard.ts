import type { Router } from "vue-router";

import { useUserStoreWithout } from "@/store/modules/user";
import { usePermissionStoreWithout } from "@/store/modules/permission";

import { PAGE_NOT_FOUND_ROUTE } from "@/router/routes/basic";

import { PageEnum } from "@/enums/pageEnum";

const LOGIN_PATH = PageEnum.BASE_LOGIN;
const WHITE_PATH_LIST: PageEnum[] = [LOGIN_PATH];

export default function permissionGuard(router: Router) {
  const userStore = useUserStoreWithout();
  const permissionStore = usePermissionStoreWithout();

  router.beforeEach(async (to, from, next) => {
    // 登入跳到 404 页面时，重定向到主页
    if (from.path === LOGIN_PATH && to.name === PAGE_NOT_FOUND_ROUTE.name) {
      next(PageEnum.BASE_HOME);
      return;
    }

    // 白名单路径跳过
    if (WHITE_PATH_LIST.includes(to.path as PageEnum)) {
      next();
      return;
    }

    const token = userStore.getToken;

    if (!token) {
      // 路由忽略权限校验
      if (to.meta.ignoreAuth) {
        next();
        return;
      }

      // 重定向到登入页
      const redirectData: {
        path: string;
        replace: boolean;
        query?: Recordable<string>;
      } = {
        path: LOGIN_PATH,
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
      }
      next(redirectData);
      return;
    }

    // 已经动态添加路由
    if (permissionStore.getRouteDynamicallyAdded) {
      next();
      return;
    }

    //todo
  });
}
