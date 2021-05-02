<template>
  <SConfigProvider>
    <RouterView />
  </SConfigProvider>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SConfigProvider from "/@/components/config-provider";

export default defineComponent({
  name: "Spider",
  components: { SConfigProvider },
});
</script>
