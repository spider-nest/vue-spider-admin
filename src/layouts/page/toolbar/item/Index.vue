<script lang="ts">
import type { FollowerPlacement } from "vueuc";

import type { Size } from "./type";

import { defineComponent } from "vue";

import { STooltip } from "@/components";
import LayoutPageToolbarItemContent from "./Content.vue";

export default defineComponent({
  name: "LayoutPageToolbarItem",
  components: { STooltip, LayoutPageToolbarItemContent },
  inheritAttrs: false,
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<Size>,
      default: "small",
    },
    tooltip: {
      type: String,
      default: undefined,
    },
    placement: {
      type: String as PropType<FollowerPlacement>,
      default: "left",
    },
  },
});
</script>

<template>
  <div>
    <STooltip v-if="tooltip" :placement="placement">
      <template #trigger>
        <LayoutPageToolbarItemContent
          v-bind="$attrs"
          :loading="loading"
          :size="size"
        >
          <slot />
        </LayoutPageToolbarItemContent>
      </template>
      {{ tooltip }}
    </STooltip>
    <LayoutPageToolbarItemContent v-else :loading="loading" :size="size">
      <slot />
    </LayoutPageToolbarItemContent>
  </div>
</template>
