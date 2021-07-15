<script lang="ts">
import type { PopoverTrigger } from "naive-ui";

import { defineComponent } from "vue";
import { NPopover } from "naive-ui";

export default defineComponent({
  name: "SPopover",
  components: { NPopover },
  inheritAttrs: false,
  props: {
    trigger: {
      type: String as PropType<PopoverTrigger>,
      default: "click",
    },
  },
});
</script>

<template>
  <NPopover v-bind="$attrs" :trigger="trigger">
    <template #trigger>
      <slot name="trigger" />
    </template>
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <slot />
  </NPopover>
</template>
