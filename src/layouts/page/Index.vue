<script lang="ts">
import { defineComponent } from "vue";

import { SLayout } from "@/components";

import useThemeStyle from "@/hooks/web/useThemeStyle";

import style, { selector } from "./style.cssr";

import useAppConfig from "@/hooks/config/useAppConfig";

const name = "LayoutPage";

export default defineComponent({
  name,
  components: { SLayout },
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
  <SLayout :class="cB" :embedded="true">
    <RouterView />
  </SLayout>
</template>
