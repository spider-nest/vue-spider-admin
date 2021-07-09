<script lang="ts">
import { defineComponent } from "vue";
import { NMenu } from "naive-ui";

export default defineComponent({
  name: "SMenu",
  components: { NMenu },
  inheritAttrs: false,
  props: {
    collapsedWidth: {
      type: Number,
      default: 56,
    },
    iconSize: {
      type: Number,
      default: 14,
    },
    rootIndent: {
      type: Number,
      default: 16,
    },
  },
});
</script>

<template>
  <NMenu
    v-bind="$attrs"
    :collapsed-width="collapsedWidth"
    :icon-size="iconSize"
    :root-indent="rootIndent"
  />
</template>
