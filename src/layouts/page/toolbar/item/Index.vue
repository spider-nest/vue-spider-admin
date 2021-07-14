<script lang="ts">
import { defineComponent } from "vue";

import useThemeStyle from "@/hooks/web/useThemeStyle";

import style, { selector } from "./style.cssr";

import useAppConfig from "@/hooks/config/useAppConfig";

const name = "LayoutPageToolbarItem";

export default defineComponent({
  name,
  inheritAttrs: false,
  setup() {
    useThemeStyle(name, style);

    const { styleNamespace } = useAppConfig();
    const cB = `${styleNamespace}-${selector}`;

    return { cB };
  },
});
</script>

<template>
  <div v-bind="$attrs" :class="cB">
    <slot />
  </div>
</template>
