<script lang="ts">
import { defineComponent } from "vue";

import SLayout from "@/components/layout/SLayout.vue";

export default defineComponent({
  name: "LayoutPage",
  components: { SLayout },
  inheritAttrs: false,
});
</script>

<template>
  <SLayout>LayoutPage</SLayout>
</template>
