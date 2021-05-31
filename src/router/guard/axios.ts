import type { Router } from "vue-router";

import appSetting from "/@/settings/app";
import AxiosCanceler from "/@/utils/axios/canceler";

export default (router: Router) => {
  const { removeAllPending } = appSetting;
  let axiosCanceler: Nullable<AxiosCanceler>;
  if (removeAllPending) {
    axiosCanceler = new AxiosCanceler();
  }

  router.beforeEach(async () => {
    axiosCanceler?.removeAllPending();
    return true;
  });
};
