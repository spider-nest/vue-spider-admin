import router from "/@/router";

import progressGuard from "./progress";

export default () => {
  progressGuard(router);
};
