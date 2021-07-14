import type { RouteLocationRaw, Router } from "vue-router";

import { unref } from "vue";
import { useRouter } from "vue-router";

import { PageEnum } from "@/enums/pageEnum";

import { isString } from "@/utils/is";

export type RouteLocationRawExpand = Omit<RouteLocationRaw, "path"> & {
  path: PageEnum;
};

function handleError(error: Error) {
  console.error(error);
}

// 合并 useRouter 的 replace 和 push 函数
export const useGo = (_router?: Router) => {
  const router = _router || useRouter();
  return (
    options: PageEnum | RouteLocationRawExpand | string = PageEnum.BASE_HOME,
    isReplace = false
  ) => {
    if (!options) return;
    if (isString(options)) {
      router[isReplace ? "replace" : "push"](options).catch(handleError);
    } else {
      router[isReplace ? "replace" : "push"](options as RouteLocationRaw).catch(
        handleError
      );
    }
  };
};

// 重定向当前页面
export const useRedo = (_router?: Router) => {
  const router = _router || useRouter();
  const { query, params, fullPath } = unref(router.currentRoute);
  return (): Promise<boolean> => {
    return new Promise((resolve) => {
      router
        .replace({
          path: `/redirect${fullPath}`,
          query,
          params,
        })
        .then(() => resolve(true))
        .catch((e: Error) => {
          console.error(e);
          resolve(false);
        });
    });
  };
};
