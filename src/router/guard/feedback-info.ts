import type { Router } from "vue-router";

import { notification as ANotification, Modal as AModal } from "ant-design-vue";
import appSetting from "/@/settings/app";
import { sError } from "/@/utils/console";

export default (router: Router) => {
  const { removeAllFeedbackInfo } = appSetting;
  router.beforeEach(async () => {
    try {
      if (removeAllFeedbackInfo) {
        AModal.destroyAll();
        ANotification.destroy();
      }
    } catch (error) {
      sError(error, true);
    }
    return true;
  });
};
