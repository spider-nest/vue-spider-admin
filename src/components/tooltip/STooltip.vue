<script lang="ts">
import { defineComponent } from "vue";
import { NTooltip } from "naive-ui";

export default defineComponent({
  name: "STooltip",
  components: { NTooltip },
  inheritAttrs: false,
});
</script>

<template>
  <NTooltip v-bind="$attrs">
    <template #trigger>
      <slot name="trigger" />
    </template>
    <slot />
  </NTooltip>
</template>
