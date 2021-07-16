<script lang="ts">
import { defineComponent, ref } from "vue";

import {
  SLayoutAside,
  SLayoutHeader,
  SLayout,
  SLayoutContent,
  SIcon,
} from "@/components";
import LayoutDefaultMenu from "@/layouts/default/menu/Index.vue";

import useAppConfig from "@/hooks/config/useAppConfig";
import useThemeStyle from "@/hooks/web/useThemeStyle";

import { useAppStore } from "@/store/modules/app";

import { elementPrefix } from "@/utils/cssr";

import style, { selector } from "./style.cssr";

const name = "LayoutDefaultAside";

export default defineComponent({
  name,
  components: {
    SLayoutAside,
    SLayoutHeader,
    SLayout,
    SLayoutContent,
    SIcon,
    LayoutDefaultMenu,
  },
  inheritAttrs: false,
  setup() {
    useThemeStyle(name, style);

    const { styleNamespace } = useAppConfig();
    const cB = `${styleNamespace}-${selector}`;
    const cE = `${cB}${elementPrefix}`;

    const { appName } = __VITE_ENV__;

    const appStore = useAppStore();
    const menuConfig = appStore.getMenuConfig;
    const collapsed = ref(menuConfig.collapsed);
    const handleCollapse = () => {
      collapsed.value = !collapsed.value;
      appStore.setMenuConfig({ collapsed: collapsed.value });
    };

    return { cB, cE, appName, collapsed, handleCollapse };
  },
});
</script>

<template>
  <SLayoutAside :class="cB" :collapsed="collapsed">
    <SLayout :class="`${cE}container`">
      <SLayoutHeader :class="`${cE}header`">
        <SIcon
          :class="`${cE}collapse`"
          name="AppsList24Regular"
          size="24"
          @click="handleCollapse"
        />
        <span v-show="!collapsed" :class="`${cE}title`">{{ appName }}</span>
      </SLayoutHeader>
      <SLayoutContent :class="`${cE}menu`">
        <LayoutDefaultMenu :collapsed="collapsed" />
      </SLayoutContent>
    </SLayout>
  </SLayoutAside>
</template>
