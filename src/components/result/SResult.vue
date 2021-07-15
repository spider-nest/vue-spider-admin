<script lang="ts">
import { defineComponent } from "vue";
import { NResult } from "naive-ui";

export default defineComponent({
  name: "SResult",
  components: { NResult },
  inheritAttrs: false,
});
</script>

<template>
  <NResult v-bind="$attrs">
    <template #footer>
      <slot name="footer" />
    </template>
    <slot />
  </NResult>
</template>
