<template>
  <SConfigProvider>
    <RouterView />
  </SConfigProvider>
</template>

<script lang="tsx">
import { defineComponent } from "vue";

import SConfigProvider from "/@/components/config-provider";

export default defineComponent({
  name: "Spider",
  components: { SConfigProvider },
});
</script>
