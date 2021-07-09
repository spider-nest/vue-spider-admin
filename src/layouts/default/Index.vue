<script lang="ts">
import { defineComponent } from "vue";

import { SLayout } from "@/components";
import LayoutPage from "@/layouts/page/Index.vue";
import LayoutDefaultSidebar from "./aside/Index.vue";

export default defineComponent({
  name: "LayoutDefault",
  components: { SLayout, LayoutPage, LayoutDefaultSidebar },
  inheritAttrs: false,
});
</script>

<template>
  <SLayout :has-sider="true" position="absolute">
    <LayoutDefaultSidebar />
    <LayoutPage />
  </SLayout>
</template>
