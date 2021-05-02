import { watch, unref } from "vue";
import { useRouter } from "vue-router";
import { useTitle as vueUseTitle } from "@vueuse/core";

import { useSetting } from "/@/hooks/useSetting";
import { useI18n } from "/@/hooks/useLocale";
import { RedirectMenu } from "/@/router/routes";

export function useTitle() {
  const { currentRoute } = useRouter();
  const newTitle = vueUseTitle();
  const { title } = useSetting();
  const { t } = useI18n();

  watch(
    () => currentRoute.value.path,
    () => {
      const route = unref(currentRoute);
      if (route.name === RedirectMenu.name) {
        return;
      }

      const tTitle = t(route?.meta?.title as string);
      newTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`;
    },
    { immediate: true }
  );
}
