import type { TransitionConfig } from "@/types/config";

import { computed } from "vue";

import { useAppStore } from "@/store/modules/app";

export function useTransitionConfig() {
  const appStore = useAppStore();

  const setTransitionConfig = (transitionConfig: Partial<TransitionConfig>) => {
    appStore.setAppConfig({ transitionConfig });
  };

  const getLoadingBar = computed(
    () => appStore.getTransitionConfig?.openLoadingBar
  );

  return {
    setTransitionConfig,
    getLoadingBar,
  };
}
