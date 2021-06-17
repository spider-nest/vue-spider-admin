import type { Router, RouteRecordRaw } from "vue-router";

import { PageEnum } from "/@/enums/page";
import { useUserStoreWithout } from "/@/store/modules/user";
import { usePermissionStoreWithout } from "/@/store/modules/permission";
import { PAGE_NOT_FOUND_ROUTE } from "/@/router/routes/basic";

const WHITE_PATH_LIST: PageEnum[] = [PageEnum.BASE_LOGIN_PATH];

export default (router: Router) => {
  const userStore = useUserStoreWithout();
  const permissionStore = usePermissionStoreWithout();
  router.beforeEach(async (to, from, next) => {
    const token = userStore.getToken;

    if (
      (from.path === PageEnum.BASE_LOGIN_PATH &&
        to.name === PAGE_NOT_FOUND_ROUTE.name) ||
      (token && to.path === PageEnum.BASE_LOGIN_PATH)
    ) {
      next(PageEnum.BASE_HOME_PATH);
      return;
    }

    if (WHITE_PATH_LIST.includes(to.path as PageEnum)) {
      next();
      return;
    }

    if (!token) {
      if (to.meta.ignoreAuth) {
        next();
        return;
      }

      const redirectData: {
        path: string;
        replace: boolean;
        query?: Recordable<string>;
      } = {
        path: PageEnum.BASE_LOGIN_PATH,
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

    if (permissionStore.getRouteAddedDynamically) {
      next();
      return;
    }

    const routes = await permissionStore.generateRoutes();
    routes.map((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });
    const redirectPath = (from.query.redirect || to.path) as string;
    const redirect = decodeURIComponent(redirectPath);
    const nextData =
      to.path === redirect ? { ...to, replace: true } : { path: redirect };
    permissionStore.setRouteAddedDynamically(true);

    next(nextData);
  });
};
