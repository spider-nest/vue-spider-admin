<script lang="ts">
import { defineComponent } from "vue";

import LayoutPageContent from "@/layouts/page/content/Index.vue";

export default defineComponent({
  name: "SystemMenu",
  components: { LayoutPageContent },
  inheritAttrs: false,
});
</script>

<template>
  <LayoutPageContent>SystemMenu</LayoutPageContent>
</template>
