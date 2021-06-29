import type { Router, RouteLocationNormalized } from "vue-router";

export default function scrollGuard(router: Router) {
  router.afterEach((to) => {
    if (/^#/.test((to as RouteLocationNormalized & { href: string })?.href)) {
      // 回到页面顶部
      document.body.scrollTo(0, 0);
    }
    return true;
  });
}
