<script lang="ts">
import { defineComponent } from "vue";
import { NTabs } from "naive-ui";

export default defineComponent({
  name: "STabs",
  components: { NTabs },
  inheritAttrs: false,
});
</script>

<template>
  <NTabs v-bind="$attrs">
    <slot />
  </NTabs>
</template>
