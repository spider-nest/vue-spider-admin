<script lang="ts">
import { defineComponent } from "vue";
import { NBreadcrumb } from "naive-ui";

export default defineComponent({
  name: "SBreadcrumb",
  components: { NBreadcrumb },
  inheritAttrs: false,
});
</script>

<template>
  <NBreadcrumb v-bind="$attrs">
    <slot />
  </NBreadcrumb>
</template>
