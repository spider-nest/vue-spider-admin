<script lang="ts">
import { defineComponent } from "vue";

import useThemeStyle from "@/hooks/web/useThemeStyle";
import useAppConfig from "@/hooks/config/useAppConfig";

import { modifierPrefix } from "@/utils/cssr";

import style, { selector } from "./style.cssr";

type Size = "small" | "default";

const name = "LayoutPageToolbarItem";

export default defineComponent({
  name,
  inheritAttrs: false,
  props: {
    size: {
      type: String as PropType<Size>,
      default: "small",
    },
  },
  setup() {
    useThemeStyle(name, style);

    const { styleNamespace } = useAppConfig();
    const cB = `${styleNamespace}-${selector}`;
    const cM = `${cB}${modifierPrefix}`;

    return { cB, cM };
  },
});
</script>

<template>
  <div v-bind="$attrs" :class="{ [cB]: true, [`${cM}${size}`]: true }">
    <slot />
  </div>
</template>
