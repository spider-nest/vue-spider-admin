<script lang="ts">
import { defineComponent } from "vue";

import LayoutPageContent from "@/layouts/page/content/Index.vue";

export default defineComponent({
  name: "SystemAccount",
  components: { LayoutPageContent },
  inheritAttrs: false,
});
</script>

<template>
  <LayoutPageContent>
    <template #container> SystemAccount container </template>
    <template #toolbar> SystemAccount toolbar </template>
  </LayoutPageContent>
</template>
