<script lang="ts">
import { defineComponent } from "vue";

import { SMenu } from "@/components";

const name = "LayoutDefaultMenu";

export default defineComponent({
  name,
  components: { SMenu },
  inheritAttrs: false,
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
  <SMenu :collapsed="collapsed" />
</template>
