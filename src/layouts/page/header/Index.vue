<script lang="ts">
import { defineComponent } from "vue";

import { SLayoutHeader } from "@/components";

import useThemeStyle from "@/hooks/web/useThemeStyle";

import style, { selector } from "./style.cssr";

import useAppConfig from "@/hooks/config/useAppConfig";

import { elementPrefix } from "@/utils/cssr";

const name = "LayoutPageHeader";

export default defineComponent({
  name,
  components: { SLayoutHeader },
  inheritAttrs: false,
  setup() {
    useThemeStyle(name, style);

    const { styleNamespace } = useAppConfig();
    const cB = `${styleNamespace}-${selector}`;
    const cE = `${cB}${elementPrefix}`;

    return { cB, cE, elementPrefix };
  },
});
</script>

<template>
  <SLayoutHeader>main header</SLayoutHeader>
</template>
