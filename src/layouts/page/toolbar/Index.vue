<script lang="ts">
import { defineComponent } from "vue";

import { SLayout } from "@/components";

import useThemeStyle from "@/hooks/web/useThemeStyle";

import style, { selector } from "./style.cssr";

import useAppConfig from "@/hooks/config/useAppConfig";

import { elementPrefix } from "@/utils/cssr";

const name = "LayoutPageToolbar";

export default defineComponent({
  name,
  components: { SLayout },
  inheritAttrs: false,
  setup() {
    useThemeStyle(name, style);

    const { styleNamespace } = useAppConfig();
    const cB = `${styleNamespace}-${selector}`;
    const cE = `${cB}${elementPrefix}`;

    return { cB, cE };
  },
});
</script>

<template>
  <SLayout :class="cB">aside header</SLayout>
</template>
