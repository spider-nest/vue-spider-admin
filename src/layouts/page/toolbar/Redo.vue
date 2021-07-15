<script lang="ts">
import { defineComponent } from "vue";

import { STooltip, SIcon } from "@/components";
import LayoutPageToolbarItem from "@/layouts/page/toolbar/item/Index.vue";

import { useRedo } from "@/hooks/web/usePage";

export default defineComponent({
  name: "LayoutPageToolbarRedo",
  components: { LayoutPageToolbarItem, STooltip, SIcon },
  inheritAttrs: false,
  setup() {
    const redo = useRedo();

    return { redo };
  },
});
</script>

<template>
  <STooltip placement="left">
    <template #trigger>
      <LayoutPageToolbarItem @click.stop.prevent="redo">
        <SIcon name="ArrowClockwise24Regular" />
      </LayoutPageToolbarItem>
    </template>
    刷新页面
  </STooltip>
</template>
