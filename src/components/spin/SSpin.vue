<script lang="ts">
import { defineComponent } from "vue";

import { NSpin } from "naive-ui";

export default defineComponent({
  name: "SSpin",
  components: { NSpin },
  inheritAttrs: false,
});
</script>

<template>
  <NSpin v-bind="$attrs">
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
    <slot />
  </NSpin>
</template>
