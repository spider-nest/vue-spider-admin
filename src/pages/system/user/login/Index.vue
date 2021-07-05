<script lang="ts">
import { defineComponent } from "vue";
import { NLayout, NButton } from "naive-ui";

import LayoutDefaultFooter from "@/layouts/default/footer/Index.vue";

import useAppConfig from "@/hooks/config/useAppConfig";
import useThemeStyle from "@/hooks/web/useThemeStyle";

import { elementPrefix } from "@/utils/cssr";

import style, { selector } from "./style.cssr";

const name = "Login";

export default defineComponent({
  name,
  components: { NLayout, NButton, LayoutDefaultFooter },
  setup() {
    const { styleNamespace } = useAppConfig();

    useThemeStyle(name, style);

    const cB = `${styleNamespace}-${selector}`;
    const cE = `${cB}${elementPrefix}`;

    return { cB, cE };
  },
});
</script>

<template>
  <NLayout position="absolute">
    <div :class="cB">
      <div :class="`${cE}container`">
        <div :class="`${cE}header`">header</div>
        <div :class="`${cE}main`">
          <NButton>main</NButton>
        </div>
        <div :class="`${cE}footer`">
          <LayoutDefaultFooter />
        </div>
      </div>
    </div>
  </NLayout>
</template>
