<script lang="ts">
import { defineComponent } from "vue";
import { NButton } from "naive-ui";

export default defineComponent({
  name: "SButton",
  components: { NButton },
  inheritAttrs: false,
});
</script>

<template>
  <NButton v-bind="$attrs">
    <slot />
  </NButton>
</template>
