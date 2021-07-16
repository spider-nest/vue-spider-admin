<script lang="ts">
import { defineComponent } from "vue";

import { NSpace } from "naive-ui";

export default defineComponent({
  name: "SSpace",
  components: { NSpace },
  inheritAttrs: false,
});
</script>

<template>
  <NSpace v-bind="$attrs">
    <slot />
  </NSpace>
</template>
