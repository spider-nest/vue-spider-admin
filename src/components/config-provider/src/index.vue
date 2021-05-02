<template>
  <ConfigProvider :locale="getAntdLocale">
    <slot />
  </ConfigProvider>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, unref } from "vue";
import { ConfigProvider } from "ant-design-vue";

import { MenuModeEnum, MenuTypeEnum } from "/@/enums/menu";

import { useTitle } from "/@/hooks/useTitle";
import { useLocale } from "/@/hooks/useLocale";
import { createBreakpointListen } from "/@/hooks/useBreakpoint";
import { createAppProviderContext } from "/@/hooks/useAppContext";
import { useAppStore } from "/@/store/modules/app";

export default defineComponent({
  name: "SConfigProvider",
  components: { ConfigProvider },
  inheritAttrs: false,
  setup(props) {
    useTitle();

    const { getAntdLocale } = useLocale();

    const isMobile = ref(false);
    const isSetState = ref(false);

    const appStore = useAppStore();

    createBreakpointListen(({ screenMap, sizeEnum, width }) => {
      const lgWidth = screenMap.get(sizeEnum.LG);
      if (lgWidth) {
        isMobile.value = width.value - 1 < lgWidth;
      }
      handleRestoreState();
    });

    const { prefixCls } = toRefs(props);
    createAppProviderContext({ prefixCls, isMobile });

    function handleRestoreState() {
      if (unref(isMobile)) {
        if (!unref(isSetState)) {
          isSetState.value = true;
          const {
            menuSetting: {
              type: menuType,
              mode: menuMode,
              collapsed: menuCollapsed,
              split: menuSplit,
            },
          } = appStore.getConfig;
          appStore.setConfig({
            menuSetting: {
              type: MenuTypeEnum.SIDEBAR,
              mode: MenuModeEnum.INLINE,
              split: false,
            },
          });
          appStore.setBeforeRestoreInfo({
            menuMode,
            menuCollapsed,
            menuType,
            menuSplit,
          });
        }
      } else {
        if (unref(isSetState)) {
          isSetState.value = false;
          const {
            menuMode,
            menuCollapsed,
            menuType,
            menuSplit,
          } = appStore.getBeforeRestoreInfo;
          appStore.setConfig({
            menuSetting: {
              type: menuType,
              mode: menuMode,
              collapsed: menuCollapsed,
              split: menuSplit,
            },
          });
        }
      }
    }

    return { getAntdLocale };
  },
});
</script>
