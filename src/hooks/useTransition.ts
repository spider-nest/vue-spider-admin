import type { TransitionSetting } from "/#/config";

import { computed } from "vue";

import { useAppStore } from "/@/store/modules/app";

export function useTransition() {
  const appStore = useAppStore();

  const enablePageTransition = computed(
    () => appStore.getTransitionSetting.page
  );
  const enableProgressTransition = computed(
    () => appStore.getTransitionSetting.progress
  );

  const setTransitionSetting = (transitionSetting: TransitionSetting) =>
    appStore.setTransitionSetting(transitionSetting);

  return {
    enablePageTransition,
    enableProgressTransition,
    setTransitionSetting,
  };
}
