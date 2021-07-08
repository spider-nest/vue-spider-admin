<script lang="ts">
import { defineComponent } from "vue";
import { NLayoutFooter } from "naive-ui";

export default defineComponent({
  name: "SLayoutFooter",
  components: { NLayoutFooter },
  inheritAttrs: false,
});
</script>

<template>
  <NLayoutFooter v-bind="$attrs">
    <slot />
  </NLayoutFooter>
</template>
