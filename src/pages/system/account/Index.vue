<script lang="ts">
import { defineComponent } from "vue";

import LayoutPageContent from "@/layouts/page/content/Index.vue";
import LayoutPageToolbarItem from "@/layouts/page/toolbar/item/Index.vue";

export default defineComponent({
  name: "SystemAccount",
  components: { LayoutPageContent, LayoutPageToolbarItem },
  inheritAttrs: false,
});
</script>

<template>
  <LayoutPageContent>
    <template #toolbar>
      <LayoutPageToolbarItem>SystemAccount container</LayoutPageToolbarItem>
    </template>
    SystemAccount container
  </LayoutPageContent>
</template>
