import type { Router } from "vue-router";

export default function messageGuard(router: Router) {
  router.beforeEach(() => {
    try {
      //todo 封装并统一配置 message 等信息反馈组件
    } catch (error) {
      console.error("message guard error:" + error);
    }

    return true;
  });
}
