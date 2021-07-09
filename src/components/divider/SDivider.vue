<script lang="ts">
import { defineComponent } from "vue";
import { NDivider } from "naive-ui";

export default defineComponent({
  name: "SDivider",
  components: { NDivider },
  inheritAttrs: false,
});
</script>

<template>
  <NDivider v-bind="$attrs">
    <slot />
  </NDivider>
</template>
