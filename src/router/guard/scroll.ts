import type { Router, RouteLocationNormalized } from "vue-router";

export default (router: Router) => {
  router.afterEach(async (to) => {
    /^#/.test((to as RouteLocationNormalized & { href: string })?.href) &&
      document.body.scrollTo(0, 0);
    return true;
  });
};
