<script lang="ts">
import { defineComponent } from "vue";

import { LayoutPageContent } from "@/layouts";

export default defineComponent({
  name: "SystemMenu",
  components: { LayoutPageContent },
  inheritAttrs: false,
});
</script>

<template>
  <LayoutPageContent>SystemMenu</LayoutPageContent>
</template>
