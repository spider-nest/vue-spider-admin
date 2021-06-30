import type { Router } from "vue-router";

import AxiosCanceler from "@/utils/http/axios/axiosCancel";

export default function httpGuard(router: Router) {
  const axiosCanceler = new AxiosCanceler();

  router.beforeEach(() => {
    // 跳转路由前清除所有等待中的请求
    axiosCanceler?.removeAllPending();
  });
}
