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

    const collapsed = ref(false);
    const handleCollapse = () => {
      collapsed.value = !collapsed.value;
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
          name="Glance24Regular"
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
