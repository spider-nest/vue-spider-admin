<script lang="ts">
import { defineComponent } from "vue";

import { SLayout } from "@/components";
import LayoutPageHeader from "@/layouts/page/header/Index.vue";
import LayoutPageFooter from "@/layouts/page/footer/Index.vue";
import LayoutPageToolbar from "@/layouts/page/toolbar/Index.vue";

import useThemeStyle from "@/hooks/web/useThemeStyle";
import useAppConfig from "@/hooks/config/useAppConfig";

import { elementPrefix } from "@/utils/cssr";

import style, { selector } from "./style.cssr";

const name = "LayoutPageContent";

export default defineComponent({
  name,
  components: {
    SLayout,
    LayoutPageHeader,
    LayoutPageFooter,
    LayoutPageToolbar,
  },
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
  <main :class="cB">
    <div :class="`${cE}main`">
      <LayoutPageHeader />
      <div :class="`${cE}container`">
        <slot />
      </div>
      <LayoutPageFooter />
    </div>
    <div :class="`${cE}aside`">
      <SLayout position="absolute" :native-scrollbar="false">
        <LayoutPageToolbar />
        <div :class="`${cE}toolbar`">
          <slot name="toolbar" />
        </div>
      </SLayout>
    </div>
  </main>
</template>
