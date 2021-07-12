<script lang="ts">
import { defineComponent } from "vue";
import { NBreadcrumbItem } from "naive-ui";

export default defineComponent({
  name: "SBreadcrumbItem",
  components: { NBreadcrumbItem },
  inheritAttrs: false,
  setup(_, { attrs }) {
    const { separator } = attrs;

    return {
      hasSeparator: !!separator,
    };
  },
});
</script>

<template>
  <NBreadcrumbItem v-bind="$attrs">
    <template v-if="hasSeparator" #separator>
      <slot name="separator" />
    </template>
    <slot />
  </NBreadcrumbItem>
</template>
