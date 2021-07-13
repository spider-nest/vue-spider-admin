<script lang="ts">
import type { AppRouteRecordRaw } from "@/router/types";

import type { Breadcrumb } from "./types";

import { defineComponent } from "vue";
import { useRoute } from "vue-router";

import {
  SLayoutHeader,
  SBreadcrumb,
  SBreadcrumbItem,
  SDropdown,
} from "@/components";
import LayoutPageHeaderBreadcrumb from "./Breadcrumb.vue";

import useThemeStyle from "@/hooks/web/useThemeStyle";

import style, { selector } from "./style.cssr";

import useAppConfig from "@/hooks/config/useAppConfig";

import { treeMap } from "@/utils/helper/treeHelper";
import { isUrl } from "@/utils/is";

import { renderLabel } from "@/layouts/page/header/util";

const name = "LayoutPageHeader";

export default defineComponent({
  name,
  components: {
    SLayoutHeader,
    SBreadcrumb,
    SBreadcrumbItem,
    SDropdown,
    LayoutPageHeaderBreadcrumb,
  },
  inheritAttrs: false,
  setup() {
    useThemeStyle(name, style);

    const { styleNamespace } = useAppConfig();
    const cB = `${styleNamespace}-${selector}`;

    const route = useRoute();
    const breadcrumbs = treeMap(route.matched, {
      conversion: (node: AppRouteRecordRaw): Breadcrumb => {
        return {
          key: node.name,
          icon: node?.meta?.icon,
          label: node?.meta?.title,
          disabled: node?.meta?.disabled,
          path: node?.path,
        };
      },
    }) as unknown as Breadcrumb[];
    const joinParentPath = (breadcrumbs: Breadcrumb[], parentPath = "") => {
      for (let index = 0; index < breadcrumbs.length; index++) {
        const breadcrumb = breadcrumbs[index];
        const { path, children } = breadcrumb;
        if (path && !(path.startsWith("/") || isUrl(path))) {
          breadcrumb.path = `${parentPath}/${path}`;
        }
        if (children?.length) {
          joinParentPath(children, breadcrumb.path);
        }
      }
    };
    joinParentPath(breadcrumbs);

    return { cB, breadcrumbs, renderLabel };
  },
});
</script>

<template>
  <SLayoutHeader :class="cB">
    <SBreadcrumb>
      <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb.key">
        <SBreadcrumbItem v-if="breadcrumb.path && breadcrumb.label">
          <template v-if="breadcrumb?.children">
            <SDropdown
              :options="breadcrumb.children"
              :render-label="renderLabel"
            >
              <LayoutPageHeaderBreadcrumb :breadcrumb="breadcrumb" />
            </SDropdown>
          </template>
          <template v-else>
            <LayoutPageHeaderBreadcrumb :breadcrumb="breadcrumb" />
          </template>
        </SBreadcrumbItem>
      </template>
    </SBreadcrumb>
  </SLayoutHeader>
</template>
