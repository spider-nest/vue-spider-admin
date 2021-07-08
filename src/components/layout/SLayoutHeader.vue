<script lang="ts">
import { defineComponent } from "vue";
import { NLayoutHeader } from "naive-ui";

export default defineComponent({
  name: "SLayoutHeader",
  components: { NLayoutHeader },
  inheritAttrs: false,
});
</script>

<template>
  <NLayoutHeader v-bind="$attrs">
    <slot />
  </NLayoutHeader>
</template>
