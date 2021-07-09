<script lang="ts">
import { defineComponent } from "vue";

import { SLayoutAside, SDivider } from "@/components";

export default defineComponent({
  name: "LayoutDefaultSidebar",
  components: { SLayoutAside, SDivider },
  inheritAttrs: false,
});
</script>

<template>
  <SLayoutAside>
    <div>LOGO</div>
    <SDivider />
    <div>MENU</div>
  </SLayoutAside>
</template>
