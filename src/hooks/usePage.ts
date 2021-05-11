import type { RouteLocationRaw } from "vue-router";

import { unref } from "vue";
import { useRouter } from "vue-router";

import { PageEnum } from "/@/enums/page";

export const useGo = (router = useRouter()) => {
  return (
    options: RouteLocationRaw | PageEnum = PageEnum.BASE_LOGIN_PATH,
    isReplace = false
  ) => {
    const { push, replace } = router;
    return isReplace ? replace(options) : push(options);
  };
};

export const useRedo = (router = useRouter()) => {
  const { push, currentRoute } = router;
  const { query, params } = currentRoute.value;

  return new Promise((resolve, reject) => {
    push({
      path: "/redirect" + unref(currentRoute).fullPath,
      query,
      params,
    })
      .then((...args) => {
        resolve(...args);
      })
      .catch((e: Error) => {
        reject(e);
      });
  });
};
