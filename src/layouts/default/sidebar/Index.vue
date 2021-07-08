<script lang="ts">
import { defineComponent } from "vue";

import SLayoutAside from "@/components/layout/SLayoutAside.vue";

export default defineComponent({
  name: "LayoutDefaultSidebar",
  components: { SLayoutAside },
  inheritAttrs: false,
});
</script>

<template>
  <SLayoutAside>LayoutDefaultSidebar</SLayoutAside>
</template>
