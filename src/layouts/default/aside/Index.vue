<script lang="ts">
import { defineComponent } from "vue";

import {
  SLayoutAside,
  SLayoutHeader,
  SLayout,
  SLayoutContent,
} from "@/components";

import useAppConfig from "@/hooks/config/useAppConfig";
import useThemeStyle from "@/hooks/web/useThemeStyle";

import { elementPrefix } from "@/utils/cssr";

import style, { selector } from "./style.cssr";

const name = "LayoutDefaultSidebar";

export default defineComponent({
  name,
  components: { SLayoutAside, SLayoutHeader, SLayout, SLayoutContent },
  inheritAttrs: false,
  setup() {
    useThemeStyle(name, style);

    const { styleNamespace } = useAppConfig();
    const cB = `${styleNamespace}-${selector}`;
    const cE = `${cB}${elementPrefix}`;

    const { appName } = __VITE_ENV__;

    return { cB, cE, appName };
  },
});
</script>

<template>
  <SLayoutAside :class="cB">
    <SLayout :class="`${cE}container`">
      <SLayoutHeader :class="`${cE}header`">
        <span>{{ appName }}</span>
      </SLayoutHeader>
      <SLayoutContent :class="`${cE}menu`">MENU</SLayoutContent>
    </SLayout>
  </SLayoutAside>
</template>
