<script lang="ts">
import { defineComponent } from "vue";

import { LayoutPageContent } from "@/layouts";

export default defineComponent({
  name: "Overview",
  components: { LayoutPageContent },
  inheritAttrs: false,
});
</script>

<template>
  <LayoutPageContent>Overview</LayoutPageContent>
</template>
