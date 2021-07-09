<script lang="ts">
import { defineComponent } from "vue";
import { NLayoutHeader } from "naive-ui";

export default defineComponent({
  name: "SLayoutHeader",
  components: { NLayoutHeader },
  inheritAttrs: false,
  props: {
    bordered: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<template>
  <NLayoutHeader v-bind="$attrs" :bordered="bordered">
    <slot />
  </NLayoutHeader>
</template>
