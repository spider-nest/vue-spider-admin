import { watch, unref } from "vue";
import { useRouter } from "vue-router";
import { useTitle as vueUseTitle } from "@vueuse/core";

import { useSetting } from "/@/hooks/useSetting";
import { useI18n } from "/@/hooks/useLocale";
import { REDIRECT_NAME } from "/@/router/constant";

export function setTitle(routeTitle: string) {
  const newTitle = vueUseTitle();
  const { title } = useSetting();
  const { t } = useI18n();
  const tTitle = t(routeTitle);

  newTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`;
}

export function useTitle() {
  const { currentRoute } = useRouter();

  watch(
    () => currentRoute.value.path,
    () => {
      const route = unref(currentRoute);
      if (route.name === REDIRECT_NAME) {
        return;
      }
      setTitle(route?.meta?.title as string);
    },
    { immediate: true }
  );
}
