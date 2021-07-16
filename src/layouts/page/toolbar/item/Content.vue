<script lang="ts">
import type { Size } from "./type";

import { defineComponent } from "vue";

import { SSpin } from "@/components";

import useThemeStyle from "@/hooks/web/useThemeStyle";
import useAppConfig from "@/hooks/config/useAppConfig";

import style, { selector } from "./style.cssr";

import { modifierPrefix } from "@/utils/cssr";

export default defineComponent({
  name: "LayoutPageToolbarItemContent",
  components: { SSpin },
  inheritAttrs: false,
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<Size>,
      default: "small",
    },
  },
  setup() {
    useThemeStyle("LayoutPageToolbarItem", style);

    const { styleNamespace } = useAppConfig();
    const cB = `${styleNamespace}-${selector}`;
    const cM = `${cB}${modifierPrefix}`;

    return { cB, cM };
  },
});
</script>

<template>
  <SSpin
    v-bind="$attrs"
    :class="{ [cB]: true, [`${cM}${size}`]: true }"
    :show="loading"
    size="small"
  >
    <slot />
  </SSpin>
</template>
