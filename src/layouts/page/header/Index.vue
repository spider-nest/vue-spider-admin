<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

import {
  SLayoutHeader,
  SBreadcrumb,
  SBreadcrumbItem,
  SIcon,
} from "@/components";

import useThemeStyle from "@/hooks/web/useThemeStyle";

import style, { selector } from "./style.cssr";

import useAppConfig from "@/hooks/config/useAppConfig";

const name = "LayoutPageHeader";

export default defineComponent({
  name,
  components: { SLayoutHeader, SBreadcrumb, SBreadcrumbItem, SIcon },
  inheritAttrs: false,
  setup() {
    useThemeStyle(name, style);

    const { styleNamespace } = useAppConfig();
    const cB = `${styleNamespace}-${selector}`;

    const route = useRoute();
    const { matched } = route;

    return { cB, matched };
  },
});
</script>

<template>
  <SLayoutHeader :class="cB">
    <SBreadcrumb>
      <template v-for="item in matched" :key="item.name">
        <SBreadcrumbItem v-if="item?.meta?.title && item.path">
          <template v-if="item?.meta?.icon">
            <SIcon :name="item.meta.icon" />
          </template>
          {{ item.meta.title }}
        </SBreadcrumbItem>
      </template>
    </SBreadcrumb>
  </SLayoutHeader>
</template>
