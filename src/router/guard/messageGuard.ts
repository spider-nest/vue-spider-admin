import type { Router } from "vue-router";

import { ref } from "vue";

export const messageRef = ref();

export default function messageGuard(router: Router) {
  router.beforeEach(() => {
    //todo
    // messageRef.value && messageRef.value.destroyAll();
  });
}
