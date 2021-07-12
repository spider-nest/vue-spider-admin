<script lang="ts">
import { defineComponent } from "vue";

import {
  SLayoutHeader,
  SBreadcrumb,
  SBreadcrumbItem,
  SIcon,
} from "@/components";

import useThemeStyle from "@/hooks/web/useThemeStyle";

import style, { selector } from "./style.cssr";

import useAppConfig from "@/hooks/config/useAppConfig";

import { usePermissionStore } from "@/store/modules/permission";

const name = "LayoutPageHeader";

export default defineComponent({
  name,
  components: { SLayoutHeader, SBreadcrumb, SBreadcrumbItem, SIcon },
  inheritAttrs: false,
  setup() {
    useThemeStyle(name, style);

    const { styleNamespace } = useAppConfig();
    const cB = `${styleNamespace}-${selector}`;

    const permissionStore = usePermissionStore();
    const menus = permissionStore.getMenuList;

    return { cB, menus };
  },
});
</script>

<template>
  <SLayoutHeader :class="cB">
    <SBreadcrumb>
      <template v-for="menu in menus" :key="menu.key">
        <SBreadcrumbItem>
          <template v-if="menu.icon">
            <component :is="menu.icon" :key="menu.key" />
          </template>
          {{ menu.name }}
        </SBreadcrumbItem>
      </template>
    </SBreadcrumb>
  </SLayoutHeader>
</template>
