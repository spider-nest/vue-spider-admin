import router from "/@/router";

import scrollGuard from "./scroll";
import progressGuard from "./progress";
import axiosGuard from "./axios";
import feedbackInfoGuard from "./feedback-info";
import pageLoadingGuard from "./page-loading";
import permissionGuard from "./permission";
import storeGuard from "./store";

export default () => {
  scrollGuard(router);
  progressGuard(router);
  axiosGuard(router);
  feedbackInfoGuard(router);
  pageLoadingGuard(router);
  permissionGuard(router);
  storeGuard(router);
};
