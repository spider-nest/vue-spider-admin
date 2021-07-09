<script lang="ts">
import { defineComponent } from "vue";

import useAppConfig from "@/hooks/config/useAppConfig";
import useThemeStyle from "@/hooks/web/useThemeStyle";

import { elementPrefix } from "@/utils/cssr";

import style, { selector } from "./style.cssr";

const name = "LayoutDefaultMenu";

export default defineComponent({
  name,
  inheritAttrs: false,
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
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
  <div :class="cB" :collapsed="collapsed">menu</div>
</template>
