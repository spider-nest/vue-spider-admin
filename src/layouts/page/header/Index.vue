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

import { treeMap } from "@/utils/helper/treeHelper";
import { isUrl } from "@/utils/is";

const name = "LayoutPageHeader";

interface Breadcrumb {
  key: string;
  icon?: string;
  label?: string;
  path?: string;
  children?: Breadcrumb[];
}

export default defineComponent({
  name,
  components: { SLayoutHeader, SBreadcrumb, SBreadcrumbItem, SIcon },
  inheritAttrs: false,
  setup() {
    useThemeStyle(name, style);

    const { styleNamespace } = useAppConfig();
    const cB = `${styleNamespace}-${selector}`;

    const route = useRoute();
    const breadcrumbs = treeMap(route.matched, {
      conversion: (node): Breadcrumb => {
        return {
          key: node.name,
          icon: node?.meta?.icon,
          label: node?.meta?.title,
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
    console.log(breadcrumbs);

    return { cB, breadcrumbs };
  },
});
</script>

<template>
  <SLayoutHeader :class="cB">
    <SBreadcrumb>
      <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb.key">
        <SBreadcrumbItem v-if="breadcrumb.path && breadcrumb.label">
          <template v-if="breadcrumb.icon">
            <SIcon :name="breadcrumb.icon" />
          </template>
          {{ breadcrumb.label }}
        </SBreadcrumbItem>
      </template>
    </SBreadcrumb>
  </SLayoutHeader>
</template>
