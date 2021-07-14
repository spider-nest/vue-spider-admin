<script lang="ts">
// 无法弹出 bug 2.15.4
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
