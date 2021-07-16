<script lang="ts">
import { defineComponent } from "vue";
import { NTooltip } from "naive-ui";

export default defineComponent({
  name: "STooltip",
  components: { NTooltip },
  inheritAttrs: false,
  props: {
    delay: {
      type: Number,
      default: 300,
    },
  },
});
</script>

<template>
  <NTooltip v-bind="$attrs" :delay="delay">
    <template #trigger>
      <slot name="trigger" />
    </template>
    <slot />
  </NTooltip>
</template>
