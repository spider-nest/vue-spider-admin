import { computed, ref, unref, ComputedRef } from "vue";
import { useEventListener } from "@vueuse/core";

import { screenMap, sizeEnum, screenEnum } from "/@/enums/breakpoint";

export interface CreateCallbackParams {
  screen: ComputedRef<sizeEnum | undefined>;
  width: ComputedRef<number>;
  realWidth: ComputedRef<number>;
  screenEnum: typeof screenEnum;
  screenMap: Map<sizeEnum, number>;
  sizeEnum: typeof sizeEnum;
}

let sScreenRef: ComputedRef<sizeEnum | undefined>;
let sWidthRef: ComputedRef<number>;
let sRealWidthRef: ComputedRef<number>;

export function useBreakpoint() {
  return {
    screenRef: computed(() => unref(sScreenRef)),
    widthRef: sWidthRef,
    screenEnum,
    realWidthRef: sRealWidthRef,
  };
}

export function createBreakpointListen(
  fn?: (opt: CreateCallbackParams) => void
) {
  const screenRef = ref<sizeEnum>(sizeEnum.XL);
  const realWidthRef = ref(window.innerWidth);

  function getWindowWidth() {
    const width = document.body.clientWidth;
    const xs = screenMap.get(sizeEnum.XS) as number;
    const sm = screenMap.get(sizeEnum.SM) as number;
    const md = screenMap.get(sizeEnum.MD) as number;
    const lg = screenMap.get(sizeEnum.LG) as number;
    const xl = screenMap.get(sizeEnum.XL) as number;
    if (width < xs) {
      screenRef.value = sizeEnum.XS;
    } else if (width < sm) {
      screenRef.value = sizeEnum.SM;
    } else if (width < md) {
      screenRef.value = sizeEnum.MD;
    } else if (width < lg) {
      screenRef.value = sizeEnum.LG;
    } else if (width < xl) {
      screenRef.value = sizeEnum.XL;
    } else {
      screenRef.value = sizeEnum.XXL;
    }
    realWidthRef.value = width;
  }

  useEventListener(window, "resize", () => {
    getWindowWidth();
    resizeFn();
  });

  getWindowWidth();
  sScreenRef = computed(() => unref(screenRef));
  sWidthRef = computed(() => screenMap.get(unref(screenRef)) as number);
  sRealWidthRef = computed((): number => unref(realWidthRef));

  function resizeFn() {
    fn?.({
      screen: sScreenRef,
      width: sWidthRef,
      realWidth: sRealWidthRef,
      screenEnum,
      screenMap,
      sizeEnum,
    });
  }

  resizeFn();
  return {
    screenRef: sScreenRef,
    screenEnum,
    widthRef: sWidthRef,
    realWidthRef: sRealWidthRef,
  };
}
