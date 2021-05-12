<template>
  <AConfigProvider :locale="getAntdLocale">
    <RouterView />
  </AConfigProvider>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, unref } from "vue";
import { ConfigProvider as AConfigProvider } from "ant-design-vue";

import { MenuModeEnum, MenuTypeEnum } from "/@/enums/menu";
import { useTitle } from "/@/hooks/useTitle";
import { useLocale } from "/@/hooks/useLocale";
import { createBreakpointListen } from "/@/hooks/useBreakpoint";
import { createAppProviderContext } from "/@/hooks/useAppContext";
import { useAppStore } from "/@/store/modules/app";
import PropTypes from "/@/utils/vue-types";
import { prefixCls } from "/@/settings/style";

export default defineComponent({
  name: "SConfigProvider",
  components: { AConfigProvider },
  inheritAttrs: false,
  props: {
    prefixCls: PropTypes.string.def(prefixCls),
  },
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
              collapsed: menuCollapsed,
              mode: menuMode,
              type: menuType,
            } = {
              collapsed: true,
              mode: MenuModeEnum.INLINE,
              type: MenuTypeEnum.SIDEBAR,
            },
          } = appStore.getAppConfig;
          appStore.setAppConfig({
            menuSetting: {
              collapsed: menuCollapsed,
              mode: menuMode,
              type: menuType,
            },
          });
          appStore.setBeforeRestoreInfo({
            menuCollapsed,
            menuMode,
            menuType,
          });
        }
      } else {
        if (unref(isSetState)) {
          isSetState.value = false;
          const { menuCollapsed, menuMode, menuType } =
            appStore.getBeforeRestoreInfo;
          appStore.setAppConfig({
            menuSetting: {
              collapsed: menuCollapsed,
              mode: menuMode,
              type: menuType,
            },
          });
        }
      }
    }

    return { getAntdLocale };
  },
});
</script>
