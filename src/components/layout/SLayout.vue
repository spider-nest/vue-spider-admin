<script lang="ts">
import { defineComponent } from "vue";
import { NLayout } from "naive-ui";

export default defineComponent({
  name: "SLayout",
  components: { NLayout },
  inheritAttrs: false,
});
</script>

<template>
  <NLayout v-bind="$attrs">
    <slot />
  </NLayout>
</template>
