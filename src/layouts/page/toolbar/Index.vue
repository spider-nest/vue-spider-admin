<script lang="ts">
import { defineComponent } from "vue";

import { SLayout } from "@/components";
import LayoutPageToolbarAvatar from "./Avatar.vue";
import LayoutPageToolbarRedo from "./Redo.vue";

import useThemeStyle from "@/hooks/web/useThemeStyle";
import useAppConfig from "@/hooks/config/useAppConfig";

import style, { selector } from "./style.cssr";

const name = "LayoutPageToolbar";

export default defineComponent({
  name,
  components: {
    SLayout,
    LayoutPageToolbarAvatar,
    LayoutPageToolbarRedo,
  },
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
  <SLayout :class="cB">
    <LayoutPageToolbarAvatar />
    <LayoutPageToolbarRedo />
  </SLayout>
</template>
