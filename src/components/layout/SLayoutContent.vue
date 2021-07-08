<script lang="ts">
import { defineComponent } from "vue";
import { NLayoutContent } from "naive-ui";

export default defineComponent({
  name: "SLayoutContent",
  components: { NLayoutContent },
  inheritAttrs: false,
});
</script>

<template>
  <NLayoutContent v-bind="$attrs">
    <slot />
  </NLayoutContent>
</template>
