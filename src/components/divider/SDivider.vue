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
  <NDivider v-if="$slots.default" v-bind="$attrs">
    <slot />
  </NDivider>
  <NDivider v-else v-bind="$attrs" />
</template>
