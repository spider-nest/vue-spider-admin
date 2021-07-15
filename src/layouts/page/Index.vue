<script lang="ts">
import { defineComponent } from "vue";

import { SLayout } from "@/components";

import useThemeStyle from "@/hooks/web/useThemeStyle";
import useAppConfig from "@/hooks/config/useAppConfig";

import style, { selector } from "./style.cssr";

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
    <RouterView>
      <template #default="{ Component, route }">
        <transition name="fade-in-transition" mode="out-in" :appear="true">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </template>
    </RouterView>
  </SLayout>
</template>
