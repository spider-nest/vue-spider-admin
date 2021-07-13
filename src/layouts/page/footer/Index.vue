<script lang="ts">
import { defineComponent } from "vue";

import LayoutDefaultFooter from "@/layouts/default/footer/Index.vue";

import useThemeStyle from "@/hooks/web/useThemeStyle";

import style, { selector } from "./style.cssr";

import useAppConfig from "@/hooks/config/useAppConfig";

const name = "LayoutPageFooter";

export default defineComponent({
  name,
  components: { LayoutDefaultFooter },
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
  <div :class="cB">
    <LayoutDefaultFooter />
  </div>
</template>
