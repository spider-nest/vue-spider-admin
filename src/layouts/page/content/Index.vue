<script lang="ts">
import { defineComponent } from "vue";

import LayoutPageHeader from "@/layouts/page/header/Index.vue";
import LayoutPageToolbar from "@/layouts/page/toolbar/Index.vue";

import useThemeStyle from "@/hooks/web/useThemeStyle";

import style, { selector } from "./style.cssr";

import useAppConfig from "@/hooks/config/useAppConfig";

import { elementPrefix } from "@/utils/cssr";

const name = "LayoutPageContent";

export default defineComponent({
  name,
  components: { LayoutPageHeader, LayoutPageToolbar },
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
  <main :class="cB">
    <div :class="`${cE}main`">
      <LayoutPageHeader />
      <div :class="`${cE}container`">
        <slot name="container" />
      </div>
    </div>
    <div :class="`${cE}aside`">
      <LayoutPageToolbar />
      <div :class="`${cE}toolbar`">
        <slot name="toolbar" />
      </div>
    </div>
  </main>
</template>
