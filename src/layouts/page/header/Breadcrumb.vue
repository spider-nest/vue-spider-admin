<script lang="ts">
import type { Breadcrumb } from "./types";

import { defineComponent } from "vue";

import { SIcon } from "@/components";

export default defineComponent({
  name: "LayoutPageHeaderBreadcrumb",
  components: { SIcon },
  inheritAttrs: false,
  props: {
    breadcrumb: {
      type: Object as PropType<Breadcrumb>,
      default: () => ({}),
    },
  },
});
</script>

<template>
  <span>
    <SIcon v-if="breadcrumb.icon" :name="breadcrumb.icon" />
    {{ breadcrumb.label }}
  </span>
</template>
