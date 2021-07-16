<script lang="ts">
import { defineComponent } from "vue";

import { LayoutPageToolbarItem } from "@/layouts";
import { SIcon } from "@/components";

import { useRedo } from "@/hooks/web/usePage";

export default defineComponent({
  name: "LayoutPageToolbarRedo",
  components: { LayoutPageToolbarItem, SIcon },
  inheritAttrs: false,
  setup() {
    const redo = useRedo();

    return { redo };
  },
});
</script>

<template>
  <LayoutPageToolbarItem tooltip="刷新页面" @click.stop.prevent="redo">
    <SIcon name="ArrowClockwise24Regular" />
  </LayoutPageToolbarItem>
</template>
